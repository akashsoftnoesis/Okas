import Image from 'next/image'
import React, { memo, useState } from 'react'

function ImageComponent(props) {
	const [isImageReady, setIsImageReady] = useState(false);

	const onLoadCallBack = () => {
		setIsImageReady(true);
	}
	
	return (
		<>
			{!isImageReady && <span className="spinner"></span>}
			<Image
				{...props}
				alt=""
				onLoadingComplete={onLoadCallBack}
			/>
		</>
	)
}
export default memo(ImageComponent)