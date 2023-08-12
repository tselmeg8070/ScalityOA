import { useEffect, useState } from 'react'

export default function SettingsComponnent({
	thresholdFirst,
	setThresholdFirst,
	thresholdSecond,
	setThresholdSecond,
	fibboCalculate
})
{

	const onChangeThresholdSecond = (e:React.ChangeEvent<HTMLInputElement>) => {
		let value = parseInt(e.target.value);
		if (!isNaN(value) && value > 0) {
			if (thresholdFirst > value)
				setThresholdFirst(value);
			setThresholdSecond(value);
			fibboCalculate(value);
		} else {
			setThresholdSecond(parseInt(e.target.value));
			fibboCalculate(1);
		}
	}

	const onChangeThresholdFirst = (e:React.ChangeEvent<HTMLInputElement>) => {
		let value = parseInt(e.target.value);
		if (!isNaN(value) && value > 0) {
			if (value < thresholdSecond)
				setThresholdFirst(value);
			else
				setThresholdFirst(thresholdSecond);
		} else {
			setThresholdFirst(parseInt(e.target.value));
		}
	}

	return (
		<div className='mt-12 bg-slate-700 p-4 w-1/2 items-center'>
			<p className='font-bebas text-gray-400 text-xl'>Settings</p>
			<div className='items-center mt-4'>
				<span className='font-bebas text-right text-gray-400 pr-4'>Threshold 1:</span>
				<input
					onChange={onChangeThresholdFirst}
					value={thresholdFirst}
					min={1}
					max={thresholdSecond}
					type="number"
					className="w-full px-4 py-2 bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
				/>
			</div>
			<div className='items-center mt-4'>
				<span className='font-bebas text-right text-gray-400 pr-4'>Threshold 2:</span>
				<input
					onChange={onChangeThresholdSecond}
					value={thresholdSecond}
					min={1}
					type="number"
					className="w-full px-4 py-2 bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
				/>
			</div>
		</div>
	)
}
