import React from 'react';
import BaseMesh from './BaseMesh';
import { IShape } from '../models/Shapes';

interface BoxMeshProps {
	shape: IShape;
	isSelected: boolean;
}

const BoxMesh: React.FC<BoxMeshProps> = ({ shape, isSelected }) => {
	const { position, size, colors } = shape;

	const halfWidth = size.width / 2;
	const halfHeight = size.height / 2;
	const halfDepth = size.depth / 2;

	const vertices = new Float32Array([
		// Передняя
		-halfWidth,
		-halfHeight,
		halfDepth,
		halfWidth,
		-halfHeight,
		halfDepth,
		halfWidth,
		halfHeight,
		halfDepth,
		-halfWidth,
		halfHeight,
		halfDepth,

		// Задняя
		halfWidth,
		-halfHeight,
		-halfDepth,
		-halfWidth,
		-halfHeight,
		-halfDepth,
		-halfWidth,
		halfHeight,
		-halfDepth,
		halfWidth,
		halfHeight,
		-halfDepth,

		// Верхняя
		-halfWidth,
		halfHeight,
		-halfDepth,
		halfWidth,
		halfHeight,
		-halfDepth,
		halfWidth,
		halfHeight,
		halfDepth,
		-halfWidth,
		halfHeight,
		halfDepth,

		// Нижняя
		-halfWidth,
		-halfHeight,
		-halfDepth,
		halfWidth,
		-halfHeight,
		-halfDepth,
		halfWidth,
		-halfHeight,
		halfDepth,
		-halfWidth,
		-halfHeight,
		halfDepth,

		// Левая
		-halfWidth,
		-halfHeight,
		-halfDepth,
		-halfWidth,
		halfHeight,
		-halfDepth,
		-halfWidth,
		halfHeight,
		halfDepth,
		-halfWidth,
		-halfHeight,
		halfDepth,

		// Правая
		halfWidth,
		-halfHeight,
		halfDepth,
		halfWidth,
		halfHeight,
		halfDepth,
		halfWidth,
		halfHeight,
		-halfDepth,
		halfWidth,
		-halfHeight,
		-halfDepth,
	]);

	const indices = [
		0,
		1,
		2,
		2,
		3,
		0, // Передняя
		4,
		5,
		6,
		6,
		7,
		4, // Задняя
		8,
		9,
		10,
		10,
		11,
		8, // Верхняя
		12,
		13,
		14,
		14,
		15,
		12, // Нижняя
		16,
		17,
		18,
		18,
		19,
		16, // Левая
		20,
		21,
		22,
		22,
		23,
		20, // Правая
	];

	const faceColors = colors.flatMap((color) => [color, color, color, color]);

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

export default BoxMesh;
