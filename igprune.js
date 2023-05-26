let followers = document.getElementsByClassName("x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x1pi30zi x1swvt13 xwib8y2 x1y1aw1k x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1");
let removeClass = "x1i10hfl xjqpnuy xa49m3k xqeqjp1 x2hbi6w x972fbf xcfux6l x1qhh985 xm0m39n xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x18d9i69 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x1lku1pv x1a2a7pz x6s0dn4 xjyslct x1lq5wgf xgqcy7u x30kzoy x9jhf4c x1ejq31n xd10rxx x1sy0etr x17r0tee x9f619 x1ypdohk x78zum5 x1i0vuye xwhw2v2 x10w6t97 xl56j7k x17ydfre x1f6kntn x1swvt13 x1pi30zi x2b8uid xlyipyv x87ps6o x14atkfc x1n2onr6 x1d5wrs8 x1gjpkn9 x175jnsf xsz8vos";
let followingClass = "_acan _acao _acas _aj1-";
let userNameClass = "x9f619 xjbqb8w x1rg5ohu x168nmei x13lgxp2 x5pf9jr xo71vjh x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np xqjyukv x6s0dn4 x1oa3qoh x1nhvcw1";
let removeConfirmationClass = "_a9-- _a9-_";

init();

async function init() {
	for (let i = 0; i < followers.length; i++) {
		checkFollower(followers[i]);
		await delay(10000);
	}
}


const delay = (ms) => new Promise(res => setTimeout(res, ms));

function checkFollower(follower) {
	let elements = getElements(follower);
	if (elements["user"]) {
		let ret = checkNotFollowing(elements["user"]);
		if (ret[1]) {
			unfollowUser(elements["remove"], ret[0]);
		}
	}
}

function getElements(follower) {
	let stack = [follower];
	let elements = {};
	while(stack.length) {
		let curr = stack.pop();
		if (curr.className === userClass) {
			elements["user"] = curr;
		} else if (curr.className === removeClass) {
			elements["remove"] = curr;
		} else {
			for (let child of curr.children) {
				stack.push(child);
			}
		}
	}
	return elements;
}

function checkNotFollowing(user) {
	let stack = [user];
	let notFollowing = false;
	let userName = "";
	while(stack.length) {
		let curr = stack.pop();
		if (curr.className === followingClass) notFollowing = true; 
		for (let child of curr.children) {
			stack.push(child);
		}
		if (curr.className === userNameClass) userName = curr.textContent;
	}
	return [userName, notFollowing];
}

async function unfollowUser(removeButton, userName) {
	removeButton.click();
	delay(100).then(() => {
		document.getElementsByClassName(removeConfirmationClass)[0].click();
		console.log("Removed " + userName);
	});
}



