"use server";

import { AddCustomerParams, Customer } from "./types";
import { cookies } from "next/headers";
import client from './client';

export async function getTotalIncome(): Promise<number | 'unauthorized' | 'error'> {
  try {
    await client.$connect();

    const sc = cookies().get('session');

    if (!sc) return 'unauthorized';

    const user = await client.user.findUnique({ where: { session: sc.value } });

    if (!user) return 'unauthorized';

    const result = await client.subscriber.aggregate({ _sum: { paymentAmount: true } });

    return Number(result._sum.paymentAmount);
  } catch (e) {
    console.log(e);
    return 'error';
  } finally {
    await client.$disconnect();
  }
}

export async function countCustomers(): Promise<number | 'unauthorized' | 'error'> {
  try {
    await client.$connect();

    const sc = cookies().get('session');

    if (!sc) return 'unauthorized';

    const user = await client.user.findUnique({ where: { session: sc.value } });

    if (!user) return 'unauthorized';

    const result = await client.subscriber.count({ where: { endsAt: { gte: new Date() } } });

    return result;
  } catch (e) {
    console.log(e);
    return 'error';
  } finally {
    await client.$disconnect();
  }
}

export async function countCustomersWillEndIn(date: string): Promise<number | 'unauthorized' | 'error'> {
  try {
    await client.$connect();

    const sc = cookies().get('session');

    if (!sc) return 'unauthorized';

    const user = await client.user.findUnique({ where: { session: sc.value } });

    if (!user) return 'unauthorized';


    const result = await client.subscriber.count({ where: { endsAt: { lte: new Date(date) } } });

    return result;
  } catch (e) {
    console.log(e);
    return 'error';
  } finally {
    await client.$disconnect();
  }
}

export async function countExpiredCustomers(): Promise<number | 'unauthorized' | 'error'> {
  try {
    await client.$connect();

    const sc = cookies().get('session');

    if (!sc) return 'unauthorized';

    const user = await client.user.findUnique({ where: { session: sc.value } });

    if (!user) return 'unauthorized';

    const result = await client.subscriber.count({ where: { endsAt: { lte: new Date() } } });

    return result;
  } catch (e) {
    console.log(e);
    return 'error';
  } finally {
    await client.$disconnect();
  }
}

/** 
    Returns the ID of the newly created customer on success.
    Returns 'duplicate' when another subscriber with same name and surname was found.
    Returns 'error' when an exception is thrown.
*/
export async function addCustomer(
  params: AddCustomerParams
): Promise<number | "duplicate" | "error" | 'unauthorized'> {
  try {
    await client.$connect();

    const c = cookies().get('session');
      if (!c) return 'unauthorized';
      const manager = await client.user.findUnique({ where: { session: c.value } });
      if (!manager) return 'unauthorized';

    if (
      await client.subscriber.count({
        where: { name: params.name, surname: params.surname },
      })
    )
      return "duplicate";

    const res = await client.subscriber.create({
      data: {
        name: params.name,
        surname: params.surname,
        age: params.age,
        paymentAmount: params.payment,
        startedAt: params.startDate,
        endsAt: params.endDate,
        gender: params.gender,
        bucketPrice: params.bucketPrice,
      },
    });

    await client.event.create({ data: { event: "create", targetId: res.id, target: "customer", actorId: manager.id } });

    return res.id;
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$connect();
  }
}

/**
 * @returns a list of all subscribers
 * @returns null if an error has occurred
 */
export async function getAllCustomers(includeMarkAsDeleted: boolean = false): Promise<Customer[] | 'unauthorized' | null> {
  await client.$connect();

  try {
    const sc = cookies().get('session');

    if (!sc) return 'unauthorized';

    const user = await client.user.findUnique({ where: { session: sc.value } });

    if (!user) return 'unauthorized';

    const customers = await client.subscriber.findMany(
      includeMarkAsDeleted 
        ? undefined 
        : { where: { deletedAt: null } });
    
      if (!customers) return null;

    return customers.map(c => {
      return { ...c,
        startedAt: c.startedAt.toISOString() ?? '', 
        endsAt: c.endsAt.toISOString() ?? '',
        bucketPrice: c.bucketPrice.toNumber(),
        paymentAmount: c.paymentAmount.toNumber()
      };
    });
  } catch (e) {
    console.log(e);
    return null;
  } finally {
    await client.$disconnect();
  }
}

/**
 * Finds a subscriber by an ID
 * @param id the ID of the subscriber
 * @returns the subscriber if found
 * @returns null if the subscriber was not found
 * @returns 'error' if an error has occurred
 */
export async function getCustomerById(
  id: number, includeDeleted: boolean
): Promise<Customer | null | 'unauthorized' | "error"> {
  await client.$connect();

  try {
    const sc = cookies().get('session');

    if (!sc) return 'unauthorized';

    const user = await client.user.findUnique({ where: { session: sc.value } });

    if (!user) return 'unauthorized';

    const customer = includeDeleted 
      ? await client.subscriber.findUnique({ where: { id } }) 
      : await client.subscriber.findUnique({ where: { id, deletedAt: null } });
    if (!customer) return null;

    return {...customer, 
      startedAt: customer.startedAt.toISOString() ?? '', 
      endsAt: customer.endsAt.toISOString() ?? '',
      bucketPrice: customer.bucketPrice.toNumber(),
      paymentAmount: customer.paymentAmount.toNumber()
    };
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function deleteCustomerById(id: number, permanent: boolean = false) {
    await client.$connect();

    try {
      const c = cookies().get('session');
      if (!c) return;
      const manager = await client.user.findUnique({ where: { session: c.value } });
      if (!manager) return;

      if (permanent) 
        await client.subscriber.delete({ where: { id } }); 
      else 
        await client.subscriber.update({ where: { id }, data: { deletedAt: new Date() } });

      await client.event.create({ data: { event: "delete", targetId: id, target: "customer", actorId: manager.id  } });
    } catch (e) {
        console.log(e);
    } finally {
        await client.$disconnect();
    }
}

export async function markCustomerAsDeleted(id: number): Promise<undefined | 'unauthorized' | 'error'> {
  try {
    await client.$connect();

    const sc = cookies().get('session');

    if (!sc) return 'unauthorized';

    const manager = await client.user.findUnique({ where: { session: sc.value } });

    if (!manager) return 'unauthorized'; 
    
    await client.subscriber.update({ where: { id }, data: { deletedAt: new Date() } });
    await client.event.create({ data: { event: "delete", targetId: id, target: "customer", actorId: manager.id  } });

  } catch (e) {
    console.log(`Could not mark customer as deleted: $${e}`);
    return 'error'
  } finally {
    await client.$disconnect();
  }
}

/**
 * 
 * @returns true if operation is successful
 * @returns false if operation fails
 */
export async function updateCustomer(data: Customer): Promise<Boolean | 'unauthorized'> {
    await client.$connect();

    try {
      const c = cookies().get('session');
      if (!c) return 'unauthorized';
      const manager = await client.user.findUnique({ where: { session: c.value } });
      if (!manager) return 'unauthorized';

        await client.subscriber.update({ where: { id: data.id }, data });
        await client.event.create({ data: { event: "update", target: "customer", targetId: data.id, actorId: manager.id } });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    } finally {
        await client.$disconnect();
    }
}
