import Hours from '../Components/City/Hours/';
import '../Components/City/Hours/Hours.scss';

export default {
    title: 'Hours',
    component: Hours,
}


export const Template = (args) => <Hours {...args} />

export const Default = Template.bind({})


Default.args = {
    loading: false,
}