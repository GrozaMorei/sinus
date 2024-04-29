// Настройки
let settings = {
	horizontalScale: 1,
	verticalScale: 1,

	sinusPfaze: 1,
	sinusVertical: 0,
	sinusHorizontal: 0,

	canvasHeight: 820,
	canvasWidtch: 820,
	canvasPadding: 50,

	backgroundCanvas: 'white',
	colorStroke: 'black',
	widthStroke: 2,

	colorSinus: 'red',
	widthSinus: 20,

	textSize: 15,
	textColor: 'black',
};

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

init(settings);
sinus(settings);

// Создание графика
function init(object) {
	canvas.setAttribute('width', object.canvasWidtch);
	canvas.setAttribute('height', object.canvasHeight);
	canvas.style.background = object.backgroundCanvas;

	// ========================= Строим абсциссу ==========================
	c.beginPath();
	c.strokeStyle = object.colorStroke;
	c.lineWidth = object.widthStroke;
	c.moveTo(object.canvasPadding, object.canvasHeight / 2);
	c.lineTo(object.canvasWidtch - object.canvasPadding, object.canvasHeight / 2);
	c.lineTo(
		object.canvasWidtch - object.canvasPadding - 15,
		object.canvasHeight / 2 + 15
	);
	c.moveTo(object.canvasWidtch - object.canvasPadding, object.canvasHeight / 2);
	c.lineTo(
		object.canvasWidtch - object.canvasPadding - 15,
		object.canvasHeight / 2 - 15
	);
	c.stroke();
	c.closePath();

	const markX =
		(object.canvasWidtch / 2 - object.canvasPadding) /
			160 /
			settings.horizontalScale -
		1;
	let piCount = 1;
	for (let i = 0; i < markX; i++) {
		const x =
			object.canvasWidtch / 2 -
			160 * i * settings.horizontalScale -
			160 * settings.horizontalScale;
		const y = object.canvasHeight / 2;

		c.beginPath();
		c.strokeStyle = object.colorStroke;
		c.lineWidth = object.widthStroke;
		c.moveTo(x, y - 5);
		c.lineTo(x, y + 5);
		c.stroke();
		c.closePath();

		c.font = `${object.textSize}px Arial`;
		c.fillStyle = object.textColor;
		if (i % 2 != 0) {
			c.fillText(`-${piCount}п`, x - 20, y + 20);
			piCount += 1;
		} else {
			c.fillText(`-${i + 1}п/2`, x - 20, y + 20);
		}
	}
	piCount = 1;
	for (let i = 0; i < markX; i++) {
		const x =
			object.canvasWidtch / 2 +
			160 * i * settings.horizontalScale +
			160 * settings.horizontalScale;
		const y = object.canvasHeight / 2;

		c.beginPath();
		c.strokeStyle = object.colorStroke;
		c.lineWidth = object.widthStroke;
		c.moveTo(x, y - 5);
		c.lineTo(x, y + 5);
		c.stroke();
		c.closePath();

		c.font = `${object.textSize}px Arial`;
		c.fillStyle = object.textColor;
		if (i % 2 != 0) {
			c.fillText(`${piCount}п`, x - 20, y + 20);
			piCount += 1;
		} else {
			c.fillText(`${i + 1}п/2`, x - 20, y + 20);
		}
	}

	// ====================== Строим ординату ==============================
	c.beginPath();
	c.strokeStyle = object.colorStroke;
	c.lineWidth = object.widthStroke;
	c.moveTo(object.canvasWidtch / 2, object.canvasHeight - object.canvasPadding);
	c.lineTo(object.canvasWidtch / 2, object.canvasPadding);
	c.lineTo(object.canvasWidtch / 2 + 15, object.canvasPadding + 15);
	c.moveTo(object.canvasWidtch / 2, object.canvasPadding);
	c.lineTo(object.canvasWidtch / 2 - 15, object.canvasPadding + 15);
	c.stroke();
	c.closePath();

	const markY =
		(object.canvasHeight / 2 - object.canvasPadding) /
			120 /
			settings.verticalScale -
		1;
	for (let i = 0; i < markY; i++) {
		const x = object.canvasWidtch / 2;
		const y =
			object.canvasHeight / 2 -
			120 * i * settings.verticalScale -
			120 * settings.verticalScale;

		c.beginPath();
		c.strokeStyle = object.colorStroke;
		c.lineWidth = object.widthStroke;
		c.moveTo(x - 5, y);
		c.lineTo(x + 5, y);
		c.stroke();
		c.closePath();

		c.font = `${object.textSize}px Arial`;
		c.fillStyle = object.textColor;
		c.fillText(`${i + 1}`, x - 20, y + 20);
	}
	for (let i = 0; i < markY; i++) {
		const x = object.canvasWidtch / 2;
		const y =
			object.canvasHeight / 2 +
			120 * i * settings.verticalScale +
			120 * settings.verticalScale;

		c.beginPath();
		c.strokeStyle = object.colorStroke;
		c.lineWidth = object.widthStroke;
		c.moveTo(x - 5, y);
		c.lineTo(x + 5, y);
		c.stroke();
		c.closePath();

		c.font = `${object.textSize}px Arial`;
		c.fillStyle = object.textColor;
		c.fillText(`-${i + 1}`, x - 20, y + 20);
	}

	// =============== Строим сетку ================
	for (
		let i = 0;
		i <= object.canvasWidtch - object.canvasPadding * 2;
		i += 40
	) {
		c.beginPath();
		c.strokeStyle = 'rgba(0, 0, 0, 0.1)';
		c.moveTo(object.canvasPadding + i, object.canvasPadding);
		c.lineTo(
			object.canvasPadding + i,
			object.canvasHeight - object.canvasPadding
		);
		c.stroke();
	}
	for (
		let i = 0;
		i <= object.canvasHeight - object.canvasPadding * 2;
		i += 40
	) {
		c.beginPath();
		c.strokeStyle = 'rgba(0, 0, 0, 0.1)';
		c.moveTo(object.canvasPadding, object.canvasPadding + i);
		c.lineTo(
			object.canvasWidtch - object.canvasPadding,
			object.canvasPadding + i
		);
		c.stroke();
	}
}

// Отрисовка синусоиды
function sinus(object) {
	c.strokeStyle = object.colorSinus;
	c.lineWidth = object.widthSinus;

	const markX =
		(object.canvasWidtch / 2 - object.canvasPadding) /
			160 /
			settings.horizontalScale -
		1;
	x0 = object.canvasWidtch / 2;
	y0 = object.canvasHeight / 2;

	flagCount = 1;
	flagY = true;

	c.beginPath();
	c.moveTo(x0 + object.sinusHorizontal, y0 + object.sinusVertical);

	for (let i = 1; i < markX + 1; i++) {
		if (flagCount == 1) {
			c.lineTo(
				x0 + 160 * i * object.horizontalScale + object.sinusHorizontal,
				y0 -
					120 * object.verticalScale * object.sinusPfaze +
					object.sinusVertical
			);
			flagCount = false;
			flagY = 0;
		} else if (flagCount == 0) {
			c.lineTo(
				x0 + 160 * i * object.horizontalScale + object.sinusHorizontal,
				y0 + object.sinusVertical
			);
			if (flagY) {
				flagCount = 1;
			} else {
				flagCount = -1;
			}
		} else {
			c.lineTo(
				x0 + 160 * i * object.horizontalScale + object.sinusHorizontal,
				y0 +
					120 * object.verticalScale * object.sinusPfaze +
					object.sinusVertical
			);
			flagY = true;
			flagCount = 0;
		}
	}
	c.stroke();

	// ======================

	flagCount = -1;
	flagY = true;

	c.beginPath();
	c.moveTo(x0 + object.sinusHorizontal, y0 + object.sinusVertical);

	for (let i = 1; i < markX + 1; i++) {
		if (flagCount == 1) {
			c.lineTo(
				x0 - 160 * i * object.horizontalScale + object.sinusHorizontal,
				y0 -
					120 * object.verticalScale * object.sinusPfaze +
					object.sinusVertical
			);
			flagCount = false;
			flagY = 0;
		} else if (flagCount == 0) {
			c.lineTo(
				x0 - 160 * i * object.horizontalScale + object.sinusHorizontal,
				y0 + object.sinusVertical
			);
			if (flagY) {
				flagCount = 1;
			} else {
				flagCount = -1;
			}
		} else {
			c.lineTo(
				x0 - 160 * i * object.horizontalScale + object.sinusHorizontal,
				y0 +
					120 * object.verticalScale * object.sinusPfaze +
					object.sinusVertical
			);
			flagY = true;
			flagCount = 0;
		}
	}
	c.stroke();
}

// Слушатели нажатий графика
const buttonList = document.querySelector('.canvas__button');
buttonList.addEventListener('click', function (e) {
	if (e.target.tagName == 'BUTTON') {
		const buttonText = e.target.textContent;
		switch (buttonText) {
			case 'В+':
				settings.canvasHeight += 80;
				init(settings);
				sinus(settings);
				break;
			case 'В-':
				settings.canvasHeight -= 80;
				init(settings);
				sinus(settings);
				break;
			case 'Ш+':
				settings.canvasWidtch += 80;
				init(settings);
				sinus(settings);
				break;
			case 'Ш-':
				settings.canvasWidtch -= 80;
				init(settings);
				sinus(settings);
				break;
			case 'MХ+':
				console.log('click');
				settings.horizontalScale += 0.1;
				init(settings);
				sinus(settings);
				break;
			case 'MХ-':
				console.log('click');
				if (settings.horizontalScale > 0.4) {
					settings.horizontalScale -= 0.1;
					init(settings);
					sinus(settings);
				}
				break;
			case 'MY+':
				console.log('click');
				settings.verticalScale += 0.1;
				init(settings);
				sinus(settings);
				break;
			case 'MY-':
				console.log('click');
				if (settings.verticalScale > 0.4) {
					settings.verticalScale -= 0.1;
					init(settings);
					sinus(settings);
				}
				break;
		}
	}
});

// Слушатели нажатий синусоиды
const sinusList = document.querySelector('.sinus__list');
sinusList.addEventListener('click', function (e) {
	if (e.target.tagName == 'BUTTON') {
		const buttonText = e.target.textContent;
		switch (buttonText) {
			case '+':
				if (settings.sinusPfaze < 1) {
					settings.sinusPfaze += 0.2;
					init(settings);
					sinus(settings);
				}
				break;
			case '-':
				if (settings.sinusPfaze > 0) {
					settings.sinusPfaze -= 0.2;
					init(settings);
					sinus(settings);
				}
				break;
			case '<':
				settings.sinusHorizontal -= 20;
				init(settings);
				sinus(settings);
				break;
			case '>':
				settings.sinusHorizontal += 20;
				init(settings);
				sinus(settings);
				break;
			case 'Поднять':
				settings.sinusVertical -= 20;
				init(settings);
				sinus(settings);
				break;
			case 'Опустить':
				settings.sinusVertical += 20;
				init(settings);
				sinus(settings);
				break;
		}
	}
});
