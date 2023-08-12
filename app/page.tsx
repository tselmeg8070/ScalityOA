"use client";
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import SettingsComponnent from '@/components/SettingsComponent';

const FibonacciAnimation = dynamic(() => import('../components/FibonacciAnimation'), {
	ssr: false
});

export default function Home() {
	const [current, setCurrent] = useState(1);
	const [seq, setSeq] = useState(new Set());
	const [seqArr, setSeqArr] = useState([1,1]);
	const [thresholdFirst, setThresholdFirst] = useState(25);
	const [thresholdSecond, setThresholdSecond] = useState(50);

	useEffect(() => {
		fibboCalculate(thresholdSecond);
	}, []);

	const renderCells = () => {
		const cells = [];
		const defaultClass = "font-bebas min-w-[30px] w-2 p-2 text-gray-300 text-center border-r";
		for (let i = Math.max(1, current - 25); i <= Math.min(thresholdSecond, current + 25); i++) {
			if (current === i) {
				if (!seq.has(current))
					cells.push(<td key={i} className={`${defaultClass} bg-lightCoral`}>{i}</td>);
				else
					cells.push(<td key={i} className={`${defaultClass} bg-mint`}>{i}</td>);
			} else {
				cells.push(<td key={i} className={`${defaultClass}
					${i >= thresholdFirst && "border-yellow-500"}
					${i < current && seq.has(i) && "text-mint"}`}>{i}</td>);
			}
		}
		return (cells);
	};

	const fibboCalculate = (n:number) => {
		let res = new Set();
		res.add(1);
		let	dp = [1,1];
		let i = 1;
		while (dp[dp.length - 1] < n) {
			dp.push(dp[i] + dp[i - 1]);
			res.add(dp[i] + dp[i - 1]);
			i++;
		}
		setSeqArr([...dp]);
		setSeq(res);
	}

	const increment = () => {
		if (current < thresholdSecond)
			setCurrent(current + 1);
	}

	const renderWarnings = () => {
		if (current == thresholdSecond)
			return (
				<div className="fixed top-20 right-4 z-50 bg-lightCoral text-white p-2 shadow-md">
					<span className="font-bebas text-lg">Error</span>
					<p className="text-xs">Threshold limit reached</p>
				</div>
			);
		else if (current >= thresholdFirst)
			return (
				<div className="fixed top-20 right-4 z-50 bg-amber-500 text-white p-2 shadow-md">
					<span className="font-bebas text-lg">Warning</span>
					<p className="text-xs">Threshold exceeded</p>
				</div>
			);
	}

	return (
		<main >
			{renderWarnings()}
			<div className='overflow-x-auto'>
				<table className='w-full space-x-4 divide-y divide-gray-200'>
					<tbody>
						<tr className="">
							{renderCells()}
						</tr>
					</tbody>
				</table>
			</div>
			<div className="grid lg:grid-cols-2 sm:grid-cols-1 mt-12">
				<div className='m-12 items-center w-full'>
					<FibonacciAnimation fibs={seq.has(current) ? seqArr.filter(e => e <= current) : []}/>
				</div>
				<div className='m-12'>
					<h1 className="font-bebas text-4xl text-white mb-6">{!seq.has(current) && "not"} Fibonacci</h1>
					<div>
						<p className="font-bebas text-6xl text-white">{current}</p>
						<button
							disabled={current === thresholdSecond ? true : undefined}
							onClick={increment}
							className={`font-bebas mt-4 ${current >= thresholdFirst ? "bg-amber-500 hover:bg-amber-300" : "bg-mint hover:bg-aquaMarine"} text-white py-2 px-12 rounded text-xl`}>
							{current !== thresholdSecond ? "INCREMENT" : "DISABLED"}
						</button>
					</div>
					<SettingsComponnent
						thresholdFirst={thresholdFirst}
						thresholdSecond={thresholdSecond}
						setThresholdFirst={setThresholdFirst}
						setThresholdSecond={setThresholdSecond}
						fibboCalculate={fibboCalculate}
					/>
				</div>
			</div>
		</main>
	)
}
