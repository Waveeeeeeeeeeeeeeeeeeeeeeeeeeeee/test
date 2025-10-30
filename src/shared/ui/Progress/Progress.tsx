interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const Progress: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps
}) => {
  const progress = currentStep / totalSteps * 100;

  return (
    <div className='relative w-full h-1 bg-gray-700 rounded-full'>
			<div
        className='absolute h-1 bg-[#6c5dd3] rounded-full transition-all duration-300'
        style={{ width: `${progress}%` }} />
      
		</div>);

};