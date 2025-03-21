import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { shapeStore } from '../stores/ShapeStore';
import { ShapeType } from '../models/Shapes';
import BoxMesh from './BoxMesh';
import PyramidMesh from './PyramidMesh';
import { Checkbox } from 'antd';

const Viewer: React.FC = observer(() => {
	const [showGrid, setShowGrid] = useState<boolean>(false);
	return (
		<>
			<div className='showgrid'>
				<Checkbox
					checked={showGrid}
					onChange={(e) => setShowGrid(e.target.checked)}
				>
					Show grid
				</Checkbox>
			</div>
			<Canvas camera={{ position: [10, 10, 20], fov: 50 }}>
				<ambientLight intensity={0.8} />
				<directionalLight position={[5, 5, 5]} intensity={1.5} />
				<pointLight position={[10, 20, 10]} />

				<OrbitControls />

				{showGrid && (
					<>
						<gridHelper args={[20, 20]} />

						<axesHelper args={[10]} />
					</>
				)}

				{shapeStore.shapes.map((shape) => {
					const isSelected = shapeStore.selectedShapeId === shape.id;

					switch (shape.type) {
						case ShapeType.BOX:
							return (
								<BoxMesh key={shape.id} shape={shape} isSelected={isSelected} />
							);
						case ShapeType.PYRAMID:
							return (
								<PyramidMesh
									key={shape.id}
									shape={shape}
									isSelected={isSelected}
								/>
							);
						default:
							return null;
					}
				})}
			</Canvas>
		</>
	);
});

export default Viewer;
