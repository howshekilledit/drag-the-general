
/*let turns = [
	[-1],
	[-1],
	[], 
	[2, 1, 0],
	[1, 0, -1],
	[],
	[3],
	[3, 2],
	//[3],
	[3, 2, 1, -1],
	[3, 2, -1],
	[],
	[3],
];*/

let turns = [
	[-1],
	[-1, 2, 3],
	[-1, 2],
	[-1, 1, 2, 3],
	[3],
	[3],


]

let frame_rate = 10;
let turn_length = 2; // 2 seconds per turn
let cycle_frames = frame_rate * turn_length;
let word_height = 20;
let scroll = word_height;
let increment = word_height / cycle_frames;
let n_lines;
let roll;


let looping = true;
function setup(){
	// count number of divs with class drag
	n_lines = document.getElementsByClassName('drag').length;
	frameRate(frame_rate);
	for (let l = 0; l < n_lines; l++){
		div = document.getElementById("a" + l);
		div.style.top = word_height + "px";
	}
	roll = document.getElementById("roll");
	roll.style.top = word_height + "px";


}
function draw(){
	let turn = Math.floor(frameCount / cycle_frames) % turns.length;
	let cycle = floor(frameCount / (cycle_frames * turns.length));
	turn = turns[turn];
	// get roll top
	let roll_top = parseInt(roll.style.top);
	for (let i = cycle * 3; i < cycle * 3 + 4; i++){
	
		div = document.getElementById("a" + i);	

		// if inside div#roll, move into parent div of roll
		if (div.parentElement.id == "roll"){
			// move div into roll's parent
			roll.parentElement.appendChild(div);
			div.style.top = roll_top + word_height + "px";

		}
		// move down by i pixels
		current = parseInt(div.style.top);
		if (turn.includes(i - cycle * 3)) {
			div.style.top = current + increment + "px";
		}
	}
	if (turn.includes(-1)) {
		roll_top += increment;
		roll.style.top = roll_top + "px";
	}
}

// toggle loop on click
function toggleLoop(){
	looping = !looping;
	if (looping){
		loop();
	}
	else{
		noLoop();
	}
}

function mouseClicked(){
	toggleLoop();
}

console.log('tension.js loaded');
//generate a div containing the word lie
// with enough spaces between letters that they match
//line
// refdiv = document.getElementById('top');
function remove_dashes(word){
	return word.replace('-', '');
}
function remove_dashes(str) {
	return str.replace(/-/g, '');
}

function intersperse(line, word, sperse = '') {
	if (remove_dashes(sperse) == word) {

	
		sperse = sperse.replace(/-/g, '&nbsp;');
		return sperse;
	}
	let word_pos = remove_dashes(sperse).length;
	let line_pos = sperse.length;
	let letter = word.slice(word_pos, word_pos + 1);
	for (let l of line.slice(line_pos)) {
		if (l == letter) {
			sperse += l;
			break;
		}
		sperse += '-';
	}
	return intersperse(line, word, sperse);
}
// create div with interspersed word
sperse = intersperse("thoughts proclaim idea", "lie");
console.log(sperse); 
div = document.getElementById('sperse');
//div.innerHTML = sperse;

