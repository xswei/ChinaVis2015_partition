

var width = window.screen.width,
    height = window.screen.height;

var color = d3.scale.category10();
	
var svg = d3.select("body").append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			//.attr("transform","translate("+0+","+0+")");

var partition = d3.layout.partition()
				.sort(null)
				.size([width*2/3,height*2/3])
				.value(function(d) { return 1; });


d3.json("data/server_type.json", function(error, root) {

	if(error)
		console.log(error);
	console.log(root);

	var nodes = partition.nodes(root);
	var links = partition.links(nodes);

	console.log(nodes);

	var rects = svg.selectAll("g")
				  .data(nodes)
				  .enter().append("g")
				  .attr("transform","translate("+300+","+200+")");
	
	rects.append("rect")
		.attr("x", function(d) { return d.x; })  
		.attr("y", function(d) { return d.y; })  
		.attr("width", function(d) { return d.dx; })  
		.attr("height", function(d) { return d.dy; })  
		.style("stroke", "#fff")
		.style("fill", function(d) { return color((d.children ? d : d.parent).name); })
		.on("mouseover",function(d){
			d3.select(this)
				.style("fill","yellow");
		})
		.on("mouseout",function(d){
			d3.select(this)
				.transition()
				.duration(200)
				.style("fill", function(d) { 
					return color((d.children ? d : d.parent).name); 
				});
		});
	  
	rects.append("text")  
		.attr("class","node_text")
		.attr("transform",function(d,i){
			if(d.depth==0){
				return "translate(" + (d.x+370) + "," + (d.y+100) + ")";
			}
			if(d.name=="web_server"){
				return "translate(" + (d.x+200) + "," + (d.y+100) + ")";
			}
			if(d.name=="smb_server"){
				return "translate(" +( (d.x+20)+5) + "," + (d.y+20) + ")rotate("+90+")";
			}
			if(d.name=="proxy_server"){
				return "translate(" +( (d.x+20)) + "," + ((d.y+20)+80) + ")";
			}
			if(d.name=="dns_ldap_server"){
				return "translate(" +( (d.x+20)+5) + "," + (d.y+20) + ")rotate("+90+")";
			}
			else{
				return "translate(" +( (d.x+20)-15) + "," + (d.y+20) + ")rotate("+90+")";
			}
		}) 
		.text(function(d,i) {
			return d.name;	
		});
  
});
