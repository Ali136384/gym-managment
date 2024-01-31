"use server";

import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { AddCustomerParams, Customer } from "./types";
import { cookies } from "next/headers";

export async function countCustomers(): Promise<number | 'error'> {
  const client = new PrismaClient();

  try {
    await client.$connect();
    const result = await client.subscriber.count({ where: { endsAt: { gte: new Date() } } });

    return result;
  } catch (e) {
    console.log(e);
    return 'error';
  } finally {
    await client.$disconnect();
  }
}

export async function countCustomersWillEndIn(date: string): Promise<number | 'error'> {
  const client = new PrismaClient();

  try {
    await client.$connect();
    const result = await client.subscriber.count({ where: { endsAt: { lte: new Date(date) } } });

    return result;
  } catch (e) {
    console.log(e);
    return 'error';
  } finally {
    await client.$disconnect();
  }
}

export async function countExpiredCustomers(): Promise<number | 'error'> {
  const client = new PrismaClient();

  try {
    await client.$connect();
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
  const client = new PrismaClient();

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

    await client.event.create({ data: { event: "create", target: "customer", actorId: manager.id } });

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
export async function getAllCustomers(): Promise<Customer[] | null> {
  const client = new PrismaClient();

  await client.$connect();

  try {
    const customers = await client.subscriber.findMany();
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
  id: number
): Promise<Customer | null | "error"> {
  const client = new PrismaClient();

  await client.$connect();

  try {
    const customer = await client.subscriber.findUnique({ where: { id } });
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

export async function deleteCustomerById(id: number) {
    const client = new PrismaClient();

    await client.$connect();

    try {
      const c = cookies().get('session');
      if (!c) return;
      const manager = await client.user.findUnique({ where: { session: c.value } });
      if (!manager) return;

      await client.subscriber.delete({ where: { id } });
      await client.event.create({ data: { event: "delete", target: "customer", actorId: manager.id  } });
    } catch (e) {
        console.log(e);
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
    const client = new PrismaClient();

    await client.$connect();

    try {
      const c = cookies().get('session');
      if (!c) return 'unauthorized';
      const manager = await client.user.findUnique({ where: { session: c.value } });
      if (!manager) return 'unauthorized';

        await client.subscriber.update({ where: { id: data.id }, data });
        await client.event.create({ data: { event: "update", target: "customer", actorId: manager.id } });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    } finally {
        await client.$disconnect();
    }
}
