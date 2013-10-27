define([],
	function () {
	'use strict';

	var Presets = {};

	Presets.binaryTree = {
		name: 'Binary tree',
		startLevel: 4,
		grammar: [
			'-> S',
			'1 i F',
			'-> F',
			'1 f [ - F ] [ + F ]'].join('\n'),
		commands: [
			': i',
			'a := 50',
			'w := 12',
			'width w',
			': f',
			'forward a',
			': +',
			'rotate 45 -45',
			': -',
			'rotate -45 45',
			': [',
			'push',
			'a *= 0.707106781',
			'w *= 0.76',
			'width w',
			': ]',
			'pop'].join('\n')
	};

	Presets.snowflake = {
		name: 'Snowflake',
		startLevel: 3,
		grammar: [
			'-> S',
			'1 A + A + A',
			'-> A',
			'1 A - A + A - A'].join('\n'),
		commands: [
			': A',
			'forward 5',
			': +',
			'rotate 120 0',
			': -',
			'rotate -60 0'].join('\n')
	};

	Presets.plant1 = {
		name: 'Plant1',
		startLevel: 3,
		grammar: [
			'-> X',
			'1 F - [ [ X ] + X ] + F [ + F X ] - X',
			'-> F',
			'1 F F'].join('\n'),
		commands: [
			': F',
			'forward 10',
			': +',
			'rotate 25 0',
			': -',
			'rotate -25 0',
			': [',
			'push',
			': ]',
			'pop'].join('\n')
	};

	Presets.broccoli = {
		name: 'Broccoli',
		startLevel: 5,
		grammar: [
			'-> S',
			'1 i F',
			'-> F',
			'1 f [ - F ] [ + F ]'].join('\n'),
		commands: [
			': i',
			'a := 100',
			'w := 12',
			'width w',
			': f',
			'forward a',
			': +',
			'rotate 45 0',
			': -',
			'rotate -60 0',
			': [',
			'push',
			'a *= 0.707106781',
			'w *= 0.7',
			'width w',
			': ]',
			'pop'].join('\n')
	};

	Presets.spirals = {
		name: 'Spirals',
		startLevel: 6,
		grammar: [
			'-> S',
			'1 i F',
			'-> F',
			'1 f [ - F ] [ + F ]'].join('\n'),
		commands: [
			': i',
			'a := 80',
			'w := 4',
			'width w',
			': f',
			'forward a',
			': +',
			'rotate 90 0',
			'pen true',
			': -',
			'rotate -90 0',
			'pen false',
			': [',
			'push',
			'a *= 0.707106781',
			'w *= 0.8',
			'width w',
			': ]',
			'pop'].join('\n')
	};

	Presets.colored = {
		name: 'Colored',
		startLevel: 5,
		grammar: [
			'-> S',
			'1 i F',
			'-> F',
			'1 f [ - F ] [ + F ]'].join('\n'),
		commands: [
			': i',
			'a := 50',
			'w := 12',
			'r := 0',
			'g := 0',
			'b := 0',
			'width w',
			': f',
			'forward a',
			': +',
			'rotate 45 0',
			'r += 50',
			'color r g b',
			': -',
			'rotate -90 0',
			'g += 50',
			'color r g b',
			': [',
			'push',
			'a *= 0.707106781',
			'w *= 0.76',
			'width w',
			': ]',
			'pop'].join('\n')
	},

	Presets.pyramid = {
		name: 'Pyramid',
		startLevel: 4,
		grammar: [
			'-> S',
			'1 i F',
			'-> F',
			'1 f [ - F ] [ + F ] [ p F ]'].join('\n'),
		commands: [
			': i',
			'a := 50',
			'w := 12',
			'width w',
			': f',
			'forward a',
			': +',
			'rotate 120 15',
			': -',
			'rotate -120 15',
			': p',
			'rotate 0 15',
			': [',
			'push',
			'a *= 0.707106781',
			'w *= 0.76',
			'width w',
			': ]',
			'pop'].join('\n')
	};

	Presets.round = {
		name: 'Round',
		startLevel: 5,
		grammar: [
			'-> B',
			'1 T B',
			'1 P [ r B ] [ q B ]',
			'-> P',
			'1 T P',
			'1 T',
			'1 T T',
			'1 T T T',
			'-> T',
			'1 f r f r f r f r',
			'1 f q f q f q f q',
			'1 f u f u f u f u',
			'1 f t f t f t f t',
			'1 f a f a f a f a',
			'1 f b f b f b f b'].join('\n'),
		commands: [
			': f',
			'forward 7',
			': a',
			'rotate 0 19',
			': b',
			'rotate 0 -19',
			': r',
			'rotate 10 0',
			': q',
			'rotate -10 0',
			': t',
			'rotate 13 0',
			': [',
			'push',
			': ]',
			'pop',
			': u',
			'rotate -13 0'].join('\n')
	};

	return Presets;
});