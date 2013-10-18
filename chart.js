function buildD3() {

		console.log(window.canvg);

		var el = window.document.querySelector("#pie");

		var svg = d3.select(el)
		  .append("svg:svg")
			  .attr("width", 100)
			  .attr("height", 100);
	     
	    svg.append("circle")
	    .attr("cx", 50)
	    .attr("cy", 25)
	    .attr("r", 12)
	    .attr("fill", '#3e8ad2'); 
		//console.log(el);

		//var canvas = window.document.getElementById('svg-canvas');
		//canvg(canvas, el.innerHTML.trim());

		return el;

	}