import React, { useRef } from 'react';
import {
	Mesh,
	BufferGeometry,
	Float32BufferAttribute,
	EdgesGeometry,
	LineSegments,
	Color,
} from 'three';
import { shapeStore } from '../stores/ShapeStore';

interface BaseMeshProps {
	vertices: Float32Array;
	indices: number[];
	colors: string[];
	position?: [number, number, number];
	isSelected: boolean;
	id: string;
}

const BaseMesh: React.FC<BaseMeshProps> = ({
	vertices,
	indices,
	colors,
	position = [0, 0, 0],
	isSelected,
	id,
}) => {
	const meshRef = useRef<Mesh>(null);
	const edgesRef = useRef<LineSegments>(null);

	const geometry = new BufferGeometry();

	const hexToRGB = (hex: string): number[] => {
		const color = new Color(hex);
		return [color.r, color.g, color.b];
	};

	const faceColors = new Float32Array(colors.flatMap(hexToRGB));

	geometry.setIndex(indices);
	geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
	geometry.setAttribute('color', new Float32BufferAttribute(faceColors, 3));
	geometry.computeVertexNormals();

	const edgesGeometry = new EdgesGeometry(geometry);

	return (
		<group
			position={position}
			onClick={(event) => {
				event.stopPropagation();

				shapeStore.selectShape(id);
			}}
			onPointerOver={(event) => {
				event.stopPropagation();
				document.body.style.cursor = 'pointer';
			}}
			onPointerOut={() => {
				document.body.style.cursor = 'default';
			}}
		>
			<mesh ref={meshRef} geometry={geometry}>
				<meshStandardMaterial vertexColors={true} side={2} />
			</mesh>

			<lineSegments ref={edgesRef} geometry={edgesGeometry}>
				<lineBasicMaterial
					color={isSelected ? 'white' : 'black'}
					linewidth={2}
				/>
			</lineSegments>
		</group>
	);
};

export default BaseMesh;
