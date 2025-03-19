import React from 'react';
import BaseMesh from './BaseMesh';
import { IShape } from '../models/Shapes';

interface PyramidMeshProps {
	shape: IShape;
	isSelected: boolean;
}

const PyramidMesh: React.FC<PyramidMeshProps> = ({ shape, isSelected }) => {
	const { position, size, colors } = shape;

	const halfDepth = size.depth / 2;
	const halfWidth = size.width / 2;
	const height = size.height;

	const vertices = new Float32Array([
		// Основание
		-halfWidth,
		0,
		-halfDepth, // 0
		halfWidth,
		0,
		-halfDepth, // 1
		halfWidth,
		0,
		halfDepth, // 2

		-halfWidth,
		0,
		-halfDepth, // 3
		halfWidth,
		0,
		halfDepth, // 4
		-halfWidth,
		0,
		halfDepth, // 5

		// Боковые
		-halfWidth,
		0,
		-halfDepth, // Задняя
		halfWidth,
		0,
		-halfDepth,
		0,
		height,
		0,

		halfWidth,
		0,
		-halfDepth, // Правая
		halfWidth,
		0,
		halfDepth,
		0,
		height,
		0,

		halfWidth,
		0,
		halfDepth, // Передняя
		-halfWidth,
		0,
		halfDepth,
		0,
		height,
		0,

		-halfWidth,
		0,
		halfDepth, // Левая
		-halfWidth,
		0,
		-halfDepth,
		0,
		height,
		0,
	]);

	const indices = [
		0,
		1,
		2,
		3,
		4,
		5, // Основание
		6,
		7,
		8, // Задняя
		9,
		10,
		11, // Правая
		12,
		13,
		14, // Передняя
		15,
		16,
		17, // Левая
	];

	const faceColors = [
		// Основание
		colors[0],
		colors[0],
		colors[0],
		colors[0],
		colors[0],
		colors[0],

		// Задняя
		colors[1],
		colors[1],
		colors[1],

		// Правая
		colors[2],
		colors[2],
		colors[2],

		// Передняя
		colors[3],
		colors[3],
		colors[3],

		// Левая
		colors[4],
		colors[4],
		colors[4],
	];

	return (
		<BaseMesh
			vertices={vertices}
			indices={indices}
			colors={faceColors}
			position={position}
			isSelected={isSelected}
			id={shape.id}
		/>
	);
};

export default PyramidMesh;
