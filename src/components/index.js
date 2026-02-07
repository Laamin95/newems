// Import all button components
import Button from './buttons/Button.vue'
import Radio from './buttons/radio/Radio.vue'
import RadioGroup from './buttons/radio/RadioGroup.vue'
import RadioItem from './buttons/radio/RadioItem.vue'
// import Chip from './buttons/Chip.vue'
// import ChipGroup from './buttons/ChipGroup.vue'
import Switch from './buttons/Switch.vue'

// Import all default components
// import Alert from './defaults/Alert.vue'
import Avatar from './defaults/Avatar.vue'
import AppBar from './defaults/AppBar.vue'
import Badge from './defaults/Badge.vue'
import Banner from './defaults/Banner.vue'
import Breadcrumbs from './defaults/Breadcrumbs.vue'
import Card from './defaults/Card.vue'
import Divider from './defaults/Divider.vue'
import Dropdown from './defaults/Dropdown.vue'
import DropdownItem from './defaults/DropdownItem.vue'  
import Expansion from './defaults/Expansion.vue'
import Footer from './defaults/Footer.vue'
import Form from './defaults/Form.vue'
import Layout from './defaults/Layout.vue'  
import NavBar from './defaults/NavBar.vue'
import Overlay from './defaults/Overlay.vue'
import Pagination from './defaults/Pagination.vue'
import SideBar from './defaults/Sidebar.vue'
import SideBarItem from './defaults/SidebarItem.vue'
import Snackbar from './defaults/Snackbar.vue'
import Timeline from './defaults/Timeline.vue'
import TimelineItem from './defaults/TimelineItem.vue'
import Tab from './defaults/Tab.vue'
import ThemeToggle from './defaults/ThemeToggle.vue'
// import Tooltip from './defaults/Tooltip.vue'

// Import all field components
import Base from './fields/Base.vue'
import Checkbox from './fields/Checkbox.vue'
import Chip from './fields/Chip.vue'
import ChipGroup from './fields/ChipGroup.vue'
import Datepicker from './fields/DatePicker.vue'
import File from './fields/FileUpload.vue'
import InputNumber from './fields/InputNumber.vue'
import InputText from './fields/InputText.vue'
import SearchInput from './fields/SearchInput.vue'
import Select from './fields/Select.vue'
import Textarea from './fields/Textarea.vue'

// Import all icon components
import Icon from './icons/Icon.vue'

//import root component


// Export all components
export {
    // Buttons
    Button,
    Radio,
    RadioGroup,
    RadioItem,
    Switch,
    
    // Defaults
    //   Alert,
    AppBar,
    Avatar,
    Badge,
    Banner,
    Breadcrumbs,
    Card,
    Divider,
    Dropdown,
    DropdownItem,
    Expansion,
    Footer,
    Form,
    Layout,
    NavBar,
    Overlay,
    Pagination,
    SideBar,
    SideBarItem,
    Snackbar,
    ThemeToggle,
    Timeline,
    TimelineItem,
    Tab,
    
    // Fields
    Base,
    Checkbox,
    Chip,
    ChipGroup,
    Datepicker,
    File,
    InputNumber,
    InputText,
    SearchInput,
    Select,
    Textarea,

    // Icons
    Icon
}

// Export as default object for easier importing
export default {
    install(app) {
        app.component('Button', Button)
        app.component('Card', Card)
        app.component('Icon', Icon)
    }
}