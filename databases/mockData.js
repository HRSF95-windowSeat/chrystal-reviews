const fs = require('fs');
const path = require('path');
const faker = require('faker');

const filePath = path.resolve(__dirname, './mockData.csv');

const start = new Date();

let restaurantId = 0;

const randomNumber = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateData = () => {
	let data = '';
	let numberOfReviews = randomNumber(3, 6);
	for ( var i = 0; i < 500000; i+=1 ) {

		const padDay = n => ( n < 10 ? `0${n}` : `${n}` );
		const padMonth = n => ( n + 1 < 10 ? `0${n + 1}` : `${n + 1}` );
		const date = faker.date.between('2017-01-01','2018-06-21');
		const YYYY = date.getFullYear();
		const MM = padMonth(date.getMonth());
		const DD = padDay(date.getDate());
		const YYYYMMDD = `${YYYY}-${MM}-${DD}`;

		data += `${restaurantId},${faker.internet.userName()},${YYYYMMDD},${randomNumber(1,5)},${randomNumber(1,5)},${randomNumber(1,5)},${randomNumber(1,5)},${randomNumber(1,5)},${randomNumber(1,5)},${randomNumber(1,5)},${faker.lorem.paragraph()}\n`;

		numberOfReviews -= 1;
		if ( numberOfReviews === 0 ) {
			restaurantId += 1;
			numberOfReviews = randomNumber(3, 6);
		}

	}
	return data;
}

let dataGenerations = 0;
// while ( dataGenerations < 30 ) {
	while ( restaurantId < 10000001 ) {
	try {
		fs.appendFileSync( filePath, generateData() );
		dataGenerations += 1;
		console.log(`\nData Generation ${dataGenerations} complete.\n`);
	} catch (err) {
		console.log(`\nNeed ... coffee ...\n`);
	}
}
const end = ((new Date() - start) / 1000) / 60;
console.log(`\nFinished in ${end} minutes.\n`);
