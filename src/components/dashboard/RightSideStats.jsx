import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import {
  getAllCustomers,
  getTotalIncome,
  getTotalSalaries,
} from "../../app/api/v1/customer";
import { months } from "./data";
const MoneyStats = () => {
  const [selectedOptionMoney, setSelectedOptionMoney] = useState("TL");
  const [income, setIncome] = useState(0);
  const [month, setMonth] = useState("Total");
  const [monthNumber, setMonthNumber] = useState("Total");
  const [salaries, setSalaries] = useState(0);
  const [moneyOfSelectedMonth, setMoneyOfSelectedMonth] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeResponse = await getTotalIncome();
        setIncome(incomeResponse);

        const salariesResponse = await getTotalSalaries();
        setSalaries(salariesResponse);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [monthNumber]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customers = await getAllCustomers();
        let totalMoney = 0;

        customers.forEach((customer) => {
          if (
            monthNumber === "Total" ||
            new Date(customer.createdAt).getMonth() === Number(monthNumber)
          ) {
            totalMoney += customer.paymentAmount;
          }
        });

        setMoneyOfSelectedMonth(totalMoney);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    fetchCustomers();
  }, [monthNumber]);

  useEffect(() => {
    const findIncome = () => {
      const incomeOfMonth = month === "Total" ? income : 0;
      setIncome(incomeOfMonth);
    };

    findIncome();
  }, [month, income]);

  return (
    <div className="right">
      <div className="income-for-gym bg-white shadow-sm w-[100%] h-[300px] rounded-md">
        <div className="selects flex justify-between mx-4 pt-3 h-full">
          <div className="flex flex-col justify-between h-full">
            <p className="text-left font-bold text-[26px] text-black">
              Gelirim
            </p>
            <div className="mb-10">
              <p className="text-left mb-2 flex justify-start h-[50%] font-bold text-[50px] ">
                <span className="mr-1 text-black">
                  <CountUp duration={0.7} end={moneyOfSelectedMonth} />
                </span>
                <span className="text-txt_primery">{selectedOptionMoney}</span>
              </p>
              <p className="flex justify-start gap-5 text-[18px] font-bold text-white ">
                {month === "Total" || month === "Tümü" ? (
                  <span className="text-black text-[15px] opacity-65 mt-5">
                    Toplam gelir
                  </span>
                ) : (
                  <span className="text-black text-[15px] opacity-65 mt-5">
                    <span className="text-black">{month}</span> Geliri
                  </span>
                )}
              </p>
            </div>
          </div>
          <select
            onChange={(e) => {
              setMonth(e.target.options[e.target.selectedIndex].text);
              setMonthNumber(e.target.value);
            }}
            className="outline-none border-[1px] px-3 h-[30px] m-2 overflow-scroll rounded-lg"
            name="months"
          >
            <option className="text-black" value="Total">
              Tümü
            </option>
            {months?.map((month, index) => (
              <option
                className="text-black"
                key={index}
                value={index.toString()}
              >
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="Salaries-of-managers bg-white shadow-sm h-[300px] w-[100%] rounded-md mt-4">
        <div className="selects flex flex-col mx-4 pt-3 justify-between h-full">
          <p className="font-bold text-[30px] text-black">Maaşlar</p>
          <div>
            <p className=" font-bold text-[40px] text-white">
              <span className="mr-1 text-black">
                <CountUp end={salaries} />
              </span>
              <span className="text-txt_primery">{selectedOptionMoney}</span>
            </p>
            <p className="p-2 m-2 text-center text-black text-[15px] font-bold">
              Bu, oturum açan yöneticilerin maaşlarını hesaplar bu sistem
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyStats;
