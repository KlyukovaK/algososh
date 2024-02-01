// Остановка
export const stop = (time: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
};