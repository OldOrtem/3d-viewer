import { makeAutoObservable } from 'mobx';
import { IShape } from '../models/Shapes';

const STORAGE_KEY = 'shapes';
const ID_STORAGE_KEY = 'shapeIds';

export class ShapeStore {
	private static ids: Record<string, number> = {};
	shapes: IShape[] = [];
	selectedShapeId: string | null = null;

	constructor() {
		makeAutoObservable(this);
		this.loadFromStorage();
	}

	addShape(shape: Omit<IShape, 'id'>) {
		const type = shape.type;
		if (!(type in ShapeStore.ids)) {
			ShapeStore.ids[type] = 0;
		}
		const newId =
			type.toUpperCase() + ' ' + (++ShapeStore.ids[type]).toString();
		this.shapes.push({ ...shape, id: newId });
		this.saveToStorage();
	}

	removeShape(id: string) {
		const shapeToRemove = this.shapes.find((shape) => shape.id === id);
		if (!shapeToRemove) return;

		this.shapes = this.shapes.filter((shape) => shape.id !== id);
		this.saveToStorage();

		// Если все фигуры данного типа удалены, сбрасываем id
		const remainingShapesOfType = this.shapes.some(
			(s) => s.type === shapeToRemove.type
		);
		if (!remainingShapesOfType) {
			delete ShapeStore.ids[shapeToRemove.type];
		}
	}

	clearShapes() {
		ShapeStore.ids = {};
		this.shapes = [];
		this.saveToStorage();
	}

	selectShape(id: string | null) {
		this.selectedShapeId = id;
	}

	private saveToStorage() {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(this.shapes));
		localStorage.setItem(ID_STORAGE_KEY, JSON.stringify(ShapeStore.ids));
	}

	private loadFromStorage() {
		const data = localStorage.getItem(STORAGE_KEY);
		const idData = localStorage.getItem(ID_STORAGE_KEY);

		if (data) {
			this.shapes = JSON.parse(data);
		}
		if (idData) {
			ShapeStore.ids = JSON.parse(idData);
		}
	}
}

export const shapeStore = new ShapeStore();
