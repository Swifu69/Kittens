const container = document.getElementsByClassName("deleteContainer")[0];

container.addEventListener("click", (e) => {
	if (e.target.classList.contains("deleteCatBtn")) {
		console.log("Touch my belly button");
	}
});
