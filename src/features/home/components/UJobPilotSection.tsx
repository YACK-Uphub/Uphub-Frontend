import Image from "next/image"
import processImage from "../../../../public/images/jobpilot.png"

const UJobpilotSection = () => {

	return (
		<>
			{/* Header */}
			<h2 className="font-bold mb-8 p-2
										 sm:text-2xl sm:p-4 sm:mb-16
									 text-custom-black text-center
									   border rounded-2xl
									 bg-custom-yellow-3">
				Jobpilot
			</h2>

			{/* Decoration */}
			<div className="w-full">
				<Image
					src={processImage}
					objectFit={"cover"}
					quality={50}
					loading={"lazy"}
					alt={"process image"}></Image>
			</div>
		</>
	);
};

export default UJobpilotSection;