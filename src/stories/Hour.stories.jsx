import Hour from '../Components/City/Hours/Hour.jsx';

export default {
    title: 'Hour',
    component: Hour,
}


const Template = args => <Hour {...args} />

export const Default = Template.bind({})

Default.args = {
    loading: false,
    time: new Date(),
    temp_c: 55,
    condition: 119,
}