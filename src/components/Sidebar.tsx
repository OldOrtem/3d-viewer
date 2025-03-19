import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { shapeStore } from '../stores/ShapeStore';
import { ShapeType, IShape, IShapeParams } from '../models/Shapes';
import { Modal, Button, Select, InputNumber } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const Sidebar: React.FC = observer(() => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [shapeType, setShapeType] = useState<ShapeType>(ShapeType.BOX);
	const [num, setNum] = useState<number>(1);
	const [size, setSize] = useState<IShapeParams>({
		width: 1,
		height: 1,
		depth: 1,
	});

	const getRandomColor = () => {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	shapeStore.shapes.forEach(console.log);

	const addShape = () => {
		const newShape: Omit<IShape, 'id'> = {
			type: shapeType,
			position: [
				Math.random() * 10 - 5,
				Math.random() * 10 - 5,
				Math.random() * 10 - 5,
			],
			size: { ...size },
			colors: Array(shapeType === ShapeType.BOX ? 6 : 5)
				.fill(null)
				.map(getRandomColor),
		};

		shapeStore.addShape(newShape);
	};

	const addShapes = () => {
		for (let i = 0; i < num; i++) {
			addShape();
		}
		setIsModalOpen(false);
	};
	const rounded = (num: number, decimals: number) =>
		Number(num.toFixed(decimals));

	return (
		<aside className='sidebar wrapper col'>
			<ul className='shapes'>
				{shapeStore.shapes.map((shape) => (
					<li
						key={shape.id}
						className={`shape wrapper row ${
							shapeStore.selectedShapeId === shape.id ? 'selected' : ''
						}`}
						onClick={() => shapeStore.selectShape(shape.id)}
					>
						<div className='colors'>
							{shape.colors.map((color) => {
								return (
									<div className='color' style={{ background: color }}></div>
								);
							})}
						</div>
						<div className='wrapper col '>
							<p className='shape__name'>{shape.id}</p>
							<p className='shape__position'>
								position: ({rounded(shape.position[0], 2)},{' '}
								{rounded(shape.position[1], 2)}, {rounded(shape.position[2], 2)}
								)
							</p>
						</div>

						<Button
							className='butt rembutt'
							size='small'
							icon={<DeleteOutlined />}
							onClick={() => shapeStore.removeShape(shape.id)}
						/>
					</li>
				))}
			</ul>

			<div className='butts wrapper row'>
				<Button
					danger
					onClick={() => shapeStore.clearShapes()}
					className='butt clearbutt'
				>
					Clear scene
				</Button>
				<Button
					type='primary'
					icon={<PlusOutlined />}
					className='butt addbutt'
					onClick={() => setIsModalOpen(true)}
				>
					Add group
				</Button>
			</div>

			<Modal
				title='Add primitives group'
				open={isModalOpen}
				onOk={addShapes}
				onCancel={() => setIsModalOpen(false)}
			>
				<div className='wrapper col'>
					<label>Type:</label>
					<Select
						className='select'
						value={shapeType}
						onChange={(value) => setShapeType(value)}
					>
						<Select.Option value={ShapeType.BOX}>Box</Select.Option>
						<Select.Option value={ShapeType.PYRAMID}>Pyramid</Select.Option>
					</Select>
					<label>Sizes (Width, Height, Depth):</label>
					<div className='wrapper row'>
						<InputNumber
							min={1}
							value={size.width}
							onChange={(value) => setSize({ ...size, width: value || 1 })}
						/>
						<InputNumber
							min={1}
							value={size.height}
							onChange={(value) => setSize({ ...size, height: value || 1 })}
						/>

						<InputNumber
							min={1}
							value={size.depth}
							onChange={(value) => setSize({ ...size, depth: value || 1 })}
						/>
					</div>
					<label>Number:</label>
					<InputNumber
						min={1}
						value={num}
						onChange={(value) => setNum(value || 1)}
					/>
				</div>
			</Modal>
		</aside>
	);
});

export default Sidebar;
