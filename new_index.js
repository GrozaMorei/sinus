let settings = {
	markingX: 20,
	markingY: 20,

	colorStroke: 'black',
	widthStroke: 3,

	styleText: '30px Arial',
	colorText: 'red',
};

const canvasContainer = document.querySelector('.canvas__inner');
const canvas = document.querySelector('.canvas');
const c = canvas.getContext('2d');
const buttonList = document.querySelector('.button__inner');

createField(canvasContainer, canvas);
createMarking(settings, canvas, settings.markingX, settings.markingY);
startListener(settings, buttonList);
createSinus(settings, canvas);

// Проверка на мобильность устройства
function isTouchDevice() {
	return 'ontouchstart' in window || navigator.maxTouchPoints;
}

// Очистка поля
function clearCanvas(canvas) {
	c.clearRect(0, 0, canvas.width, canvas.height);
}

// Создание поля
function createField(container, canvas) {
	// Проверка
	if (container == undefined || canvas == undefined) {
		alert('Ошибка в создании поля. Параметры не определены.');
		return;
	}

	// Устанавливаем размеры canvas
	const screenWidth = window.innerWidth;
	const screenHeight = window.innerHeight;
	// Необходимо для мобильных устройств
	const pixelRatio = window.devicePixelRatio || 1;
	canvas.width = screenWidth * pixelRatio * 2;
	canvas.height = screenHeight * pixelRatio * 2;

	// Задаем скролл так, чтобы canvas был по центру
	container.scrollLeft = (canvas.offsetWidth - container.offsetWidth) / 2;
	container.scrollTop = (canvas.offsetHeight - container.offsetHeight) / 2;

	// Провреряем мобильность устройства
	if (isTouchDevice()) {
		container.style.overflow = 'scroll';
	}

	// Реализуем перемещение по canvas
	let flagMouseMoving = false;
	let startX, startY, startScrollLeft, startScrollTop;

	container.addEventListener('mousedown', function (e) {
		startX = e.clientX;
		startY = e.clientY;
		startScrollLeft = container.scrollLeft;
		startScrollTop = container.scrollTop;
		container.style.cursor = 'grabbing';
		flagMouseMoving = true;
	});

	window.addEventListener('mouseup', function () {
		flagMouseMoving = false;
		container.style.cursor = 'grab';
	});

	window.addEventListener('mousemove', function (e) {
		if (flagMouseMoving) {
			let deltaX = e.clientX - startX;
			let deltaY = e.clientY - startY;
			container.scrollLeft = startScrollLeft - deltaX;
			container.scrollTop = startScrollTop - deltaY;
		}
	});
}

// Создание разметки
function createMarking(object, canvas, markingX, markingY) {
	const widtch = canvas.offsetWidth;
	const height = canvas.offsetHeight;

	// Проверка на четность линий
	if (markingX % 2 != 0) {
		markingX += 1;
	}
	if (markingY % 2 != 0) {
		markingY += 1;
	}

	// Расчитываем интервалы
	const intervalX = widtch / markingX;
	const intervalY = height / markingY;

	// Горизонтальные линии
	for (let x = 0; x <= widtch; x += intervalX) {
		if (Math.round(x) == widtch / 2) {
			c.beginPath();
			c.strokeStyle = object.colorStroke;
			c.lineWidth = object.widthStroke;
			c.moveTo(x, 0);
			c.lineTo(x, height);
			c.stroke();
			c.closePath();
		} else {
			c.beginPath();
			c.strokeStyle = 'rgba(0, 0, 0, 0.2)';
			c.lineWidth = 1;
			c.moveTo(x, 0);
			c.lineTo(x, height);
			c.stroke();
			c.closePath();
		}
	}

	// Вертикальные линии
	for (let y = 0; y <= height; y += intervalY) {
		if (Math.round(y) == height / 2) {
			c.beginPath();
			c.strokeStyle = object.colorStroke;
			c.lineWidth = object.widthStroke;
			c.moveTo(0, y);
			c.lineTo(widtch, y);
			c.stroke();
			c.closePath();
		} else {
			c.beginPath();
			c.strokeStyle = 'rgba(0, 0, 0, 0.2)';
			c.lineWidth = 1;
			c.moveTo(0, y);
			c.lineTo(widtch, y);
			c.stroke();
			c.closePath();
		}
	}

	// Горизонтальнаz и вертикальная разметка
	const centrLineX = Math.ceil(markingX / 2);
	const centrLineY = Math.ceil(markingY / 2);

	c.font = object.styleText;
	c.fillStyle = object.colorText;

	let positionX = canvas.width / 2;
	let positionY = canvas.height / 2;
	for (let i = centrLineX; i > 0; i--) {
		if (centrLineX - i == 0) {
			positionX -= intervalX;
		} else {
			if ((centrLineX - i) % 2 == 0) {
				c.fillText(`-${(centrLineX - i) / 2}п`, positionX + 20, positionY + 40);
			} else {
				c.fillText(`-${centrLineX - i} / 2п`, positionX + 20, positionY + 40);
			}
			positionX -= intervalX;
		}
	}

	positionX = canvas.width / 2;
	for (let i = centrLineX; i > 0; i--) {
		if (centrLineX - i == 0) {
			positionX += intervalX;
		} else {
			if ((centrLineX - i) % 2 == 0) {
				c.fillText(`${(centrLineX - i) / 2}п`, positionX + 20, positionY + 40);
			} else {
				c.fillText(`${centrLineX - i} / 2п`, positionX + 20, positionY + 40);
			}
			positionX += intervalX;
		}
	}

	positionX = canvas.width / 2;
	for (let i = centrLineY; i > 0; i--) {
		if (centrLineY - i == 0) {
			positionY += intervalY;
		} else {
			c.fillText(`-${centrLineY - i}`, positionX + 20, positionY + 40);
			positionY += intervalY;
		}
	}

	positionY = canvas.height / 2;
	for (let i = centrLineY; i > 0; i--) {
		if (centrLineY - i == 0) {
			positionY -= intervalY;
		} else {
			c.fillText(`${centrLineY - i}`, positionX + 20, positionY - 20);
			positionY -= intervalY;
		}
	}
}

// Создание синусоиды
function createSinus(object, canvas) {
	c.beginPath;
	let x = 0;
	let y = 0;
	const amplitude = canvas.height / object.markingY;
	const frequency = canvas.width / object.markingX;
	while (x < canvas.width) {
		y = canvas.height / 2 + amplitude * Math.sin(x / frequency);
		c.lineTo(x, y);
		x = x + 1;
	}
	c.stroke();
}

// Обработчики меню
function startListener(object, buttonList) {
	buttonList.addEventListener('click', function (e) {
		const request = e.target.textContent;

		switch (request) {
			case 'MY+':
				object.markingX += 2;
				clearCanvas(canvas);
				createMarking(object, canvas, object.markingX, object.markingY);
				createSinus(settings, canvas);
				break;
			case 'MY-':
				object.markingX -= 2;
				clearCanvas(canvas);
				createMarking(object, canvas, object.markingX, object.markingY);
				createSinus(settings, canvas);
				break;
			case 'MX+':
				object.markingY += 2;
				clearCanvas(canvas);
				createMarking(object, canvas, object.markingX, object.markingY);
				createSinus(settings, canvas);
				break;
			case 'MX-':
				object.markingY -= 2;
				clearCanvas(canvas);
				createMarking(object, canvas, object.markingX, object.markingY);
				createSinus(settings, canvas);
				break;
		}
	});
}
