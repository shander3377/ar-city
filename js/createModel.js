AFRAME.registerComponent("create_models", {
	init: async function () {
		var models = await this.getModels();

		var barcodeValues = Object.keys(models);

		barcodeValues.forEach((barcode) => {
			var building = models[barcode];
			// console.log(building)
			this.createModels(building);
		});
		console.log(models);
		console.log(typeof models);

		// this.createModels(models)
	},

	getModels: async function () {
		var models = await fetch("js/models.json")
			.then((res) => res.json())
			.then((data) => data);

		return models;
	},

	createModels: function (building) {
		var barcodeValue = building.barcode_value;
		var modelUrl = building.model_url;
		var modelName = building.model_name;

		var scene = document.querySelector("#scene");
		var marker = document.createElement("a-marker");

		marker.setAttribute("id", `marker-${modelName}`);
		marker.setAttribute("type", "barcode");
		marker.setAttribute("model_name", modelName);
		marker.setAttribute("value", barcodeValue);
		marker.setAttribute("markerHandler", {});
		scene.appendChild(marker);

		if (barcodeValue === 0) {
			var modelEl = document.createElement("a-entity");
			modelEl.setAttribute("id", modelName);
			modelEl.setAttribute("geometry", {
				primtive: "box",
				width: building.width,
				height: building.height,
			});

			modelEl.setAttribute("position", building.position);
			modelEl.setAttribute("rotation", building.rotation);
			modelEl.setAttribute("material", {
				color: building.color,
			});
			marker.appendChild(modelEl);
		} else {
			var modelEl = document.createElement("a-entity");
			modelEl.setAttribute("id", modelName);
			modelEl.setAttribute("gltf-model", `url(${modelUrl})`);
			modelEl.setAttribute("scale", building.scale);
			modelEl.setAttribute("position", building.position);
			modelEl.setAttribute("rotation", building.rotation);
			marker.appendChild(modelEl);
		}
	},
});
