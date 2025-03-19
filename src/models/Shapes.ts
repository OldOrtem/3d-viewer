export interface IShape {
	id: string;
	type: ShapeType;
	position: [number, number, number];
	size: IShapeParams;
	colors: string[];
}

export enum ShapeType {
	BOX = 'box',
	PYRAMID = 'pyramid',
}

export interface IShapeParams {
	width: number;
	height: number;
	depth: number;
}

export interface IBox extends IShape {
	type: ShapeType.BOX;
}

export interface IPyramid extends IShape {
	type: ShapeType.PYRAMID;
}
