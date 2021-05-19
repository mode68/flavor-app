import React from 'react';
import Table from 'react-bootstrap/Table';

const WorkHoursDisplay = ({ workHours }) => {
	const parseTimeDigit = (digit) => {
		return digit < 10 ? '0' + digit : digit;
	};
	const parseDay = (day) => {
		return day.length === 0
			? 'Closed'
			: day.map((hourSpan, i) => (
					<span key={'workhours-' + i}>
						{parseTimeDigit(hourSpan[0].hour) +
							':' +
							parseTimeDigit(hourSpan[0].minute) +
							' - ' +
							parseTimeDigit(hourSpan[1].hour) +
							':' +
							parseTimeDigit(hourSpan[1].minute)}
						<br />
					</span>
			  ));
	};
	return (
		<Table responsive='sm' style={{ color: 'white' }}>
			<thead>
				<tr>
					<th>Monday</th>
					<th>Tuesday</th>
					<th>Wednesday</th>
					<th>Thursday</th>
					<th>Friday</th>
					<th>Saturday</th>
					<th>Sunday</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					{workHours.map((day, i) => (
						<td key={'workdays-' + i}>{parseDay(day)}</td>
					))}
				</tr>
			</tbody>
		</Table>
	);
};

export default WorkHoursDisplay;
