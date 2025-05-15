import type {Meta, StoryObj} from '@storybook/react';
import CustomBlueButton from './YBlueButton';

const meta: Meta<typeof CustomBlueButton> = {
	title: 'Components/CustomBlueButton',
	component: CustomBlueButton,
	tags: ['autodocs'],
	argTypes: {
		iconPosition: {
			control: {type: 'radio'},
			options: ['left', 'right'],
		},
		width: {
			control: 'text',
		},
		height: {
			control: 'text',
		},
		onClick: {action: 'clicked'},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const LeftIcon: Story = {
	args: {
		label: 'Back',
		iconPosition: 'left',
		width: 'w-40',
		height: 'h-12',
	},
};

export const RightIcon: Story = {
	args: {
		label: 'Next',
		iconPosition: 'right',
		width: 'w-40',
		height: 'h-12',
	},
};

export const AutoSize: Story = {
	args: {
		label: 'Auto Size',
	},
};
