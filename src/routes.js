import Dashboard from './views/dashboard/Dashboard'
import Colors from './views/theme/colors/Colors'
import Typography from './views/theme/typography/Typography'

// Base components
import Accordion from './views/base/accordion/Accordion';
import Breadcrumbs from './views/base/breadcrumbs/Breadcrumbs';
import Cards from './views/base/cards/Cards';
import Carousels from './views/base/carousels/Carousels';
import Collapses from './views/base/collapses/Collapses';
import ListGroups from './views/base/list-groups/ListGroups';
import Navs from './views/base/navs/Navs';
import Paginations from './views/base/paginations/Paginations';
import Placeholders from './views/base/placeholders/Placeholders';
import Popovers from './views/base/popovers/Popovers';
import Progress from './views/base/progress/Progress';
import Spinners from './views/base/spinners/Spinners';
import Tabs from './views/base/tabs/Tabs';
import Tables from './views/base/tables/Tables';
import Tooltips from './views/base/tooltips/Tooltips';

// Buttons
import Buttons from './views/buttons/buttons/Buttons';
import ButtonGroups from './views/buttons/button-groups/ButtonGroups';
import Dropdowns from './views/buttons/dropdowns/Dropdowns';

// Forms
import ChecksRadios from './views/forms/checks-radios/ChecksRadios';
import FloatingLabels from './views/forms/floating-labels/FloatingLabels';
import FormControl from './views/forms/form-control/FormControl';
import InputGroup from './views/forms/input-group/InputGroup';
import Layout from './views/forms/layout/Layout';
import Range from './views/forms/range/Range';
import Select from './views/forms/select/Select';
import Validation from './views/forms/validation/Validation';

// Charts
import Charts from './views/charts/Charts';

// Icons
import CoreUIIcons from './views/icons/coreui-icons/CoreUIIcons';
import Flags from './views/icons/flags/Flags';
import Brands from './views/icons/brands/Brands';

// Notifications
import Alerts from './views/notifications/alerts/Alerts';
import Badges from './views/notifications/badges/Badges';
import Modals from './views/notifications/modals/Modals';
import Toasts from './views/notifications/toasts/Toasts';

// Widgets
import Widgets from './views/widgets/Widgets';
import AppointmentPage from './views/pages/AppointmentPage';


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/appointment', name: 'Colors', component: AppointmentPage },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', component: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', component: Placeholders },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress', name: 'Progress', component: Progress },
  { path: '/base/spinners', name: 'Spinners', component: Spinners },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/forms', name: 'Forms', component: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', component: FormControl },
  { path: '/forms/select', name: 'Select', component: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', component: ChecksRadios },
  { path: '/forms/range', name: 'Range', component: Range },
  { path: '/forms/input-group', name: 'Input Group', component: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', component: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', component: Layout },
  { path: '/forms/validation', name: 'Validation', component: Validation },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toasts', name: 'Toasts', component: Toasts },
  { path: '/widgets', name: 'Widgets', component: Widgets },
]

export default routes
