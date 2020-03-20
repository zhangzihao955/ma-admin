import Vue from 'vue'
//登录组件引入的组件
import {Button,Form, FormItem,Input,Message,MessageBox } from 'element-ui';
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
//全局使用message
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
//首页布局组件按需引入的element-ui组件
import {Container,Header,Aside,Main} from 'element-ui';
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
//首页头部组件按需引入的element-ui组件
import {Row,Col} from 'element-ui';
Vue.use(Row);
Vue.use(Col)
//首页侧边导航栏的组件引入
import {Menu,Submenu,MenuItemGroup,MenuItem} from 'element-ui';
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);

//用户列表页面的样式组件
import {Card,Breadcrumb,BreadcrumbItem} from "element-ui";
Vue.use(Card);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
//用户列表页面的表格组件
import {Table,TableColumn,Switch} from 'element-ui';
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Switch);
//用户列表分页使用的组件
import {Pagination} from 'element-ui';
Vue.use(Pagination);
//用户列表 弹出对话框组件
import {Dialog,Select,Option,Tag,Tree,Alert} from 'element-ui';
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert)
//添加商品 步骤条
import {Steps,Step} from 'element-ui';
Vue.use(Steps);
Vue.use(Step)
//添加商品tabs栏组件
import {Tabs,TabPane} from 'element-ui';
Vue.use(Tabs);
Vue.use(TabPane)
//添加商品 级联选择器
import {Cascader} from 'element-ui';
Vue.use(Cascader)
//商品参数 复选框
import {CheckboxGroup,Checkbox} from 'element-ui';
Vue.use(Checkbox);
Vue.use(CheckboxGroup)
//文件上传组件
import {Upload} from 'element-ui';
Vue.use(Upload);


// -------------------------------
// import {
//     Pagination,
//     Dialog,
//     Autocomplete,
//     Dropdown,
//     DropdownMenu,
//     DropdownItem,
//     Menu,
//     Submenu,
//     MenuItem,
//     MenuItemGroup,
//     Input,
//     InputNumber,
//     Radio,
//     RadioGroup,
//     RadioButton,
//     Checkbox,
//     CheckboxButton,
//     CheckboxGroup,
//     Switch,
//     Select,
//     Option,
//     OptionGroup,
//     Button,
//     ButtonGroup,
//     Table,
//     TableColumn,
//     DatePicker,
//     TimeSelect,
//     TimePicker,
//     Popover,
//     Tooltip,
//     Breadcrumb,
//     BreadcrumbItem,
//     Form,
//     FormItem,
//     Tabs,
//     TabPane,
//     Tag,
//     Tree,
//     Alert,
//     Slider,
//     Icon,
//     Row,
//     Col,
//     Upload,
//     Progress,
//     Spinner,
//     Badge,
//     Card,
//     Rate,
//     Steps,
//     Step,
//     Carousel,
//     CarouselItem,
//     Collapse,
//     CollapseItem,
//     Cascader,
//     ColorPicker,
//     Transfer,
//     Container,
//     Header,
//     Aside,
//     Main,
//     Footer,
//     Timeline,
//     TimelineItem,
//     Link,
//     Divider,
//     Image,
//     Calendar,
//     Backtop,
//     PageHeader,
//     CascaderPanel,
//     Loading,
//     MessageBox,
//     Message,
//     Notification
//   } from 'element-ui';
  
//   Vue.use(Pagination);
//   Vue.use(Dialog);
//   Vue.use(Autocomplete);
//   Vue.use(Dropdown);
//   Vue.use(DropdownMenu);
//   Vue.use(DropdownItem);
//   Vue.use(Menu);
//   Vue.use(Submenu);
//   Vue.use(MenuItem);
//   Vue.use(MenuItemGroup);
//   Vue.use(Input);
//   Vue.use(InputNumber);
//   Vue.use(Radio);
//   Vue.use(RadioGroup);
//   Vue.use(RadioButton);
//   Vue.use(Checkbox);
//   Vue.use(CheckboxButton);
//   Vue.use(CheckboxGroup);
//   Vue.use(Switch);
//   Vue.use(Select);
//   Vue.use(Option);
//   Vue.use(OptionGroup);
//   Vue.use(Button);
//   Vue.use(ButtonGroup);
//   Vue.use(Table);
//   Vue.use(TableColumn);
//   Vue.use(DatePicker);
//   Vue.use(TimeSelect);
//   Vue.use(TimePicker);
//   Vue.use(Popover);
//   Vue.use(Tooltip);
//   Vue.use(Breadcrumb);
//   Vue.use(BreadcrumbItem);
//   Vue.use(Form);
//   Vue.use(FormItem);
//   Vue.use(Tabs);
//   Vue.use(TabPane);
//   Vue.use(Tag);
//   Vue.use(Tree);
//   Vue.use(Alert);
//   Vue.use(Slider);
//   Vue.use(Icon);
//   Vue.use(Row);
//   Vue.use(Col);
//   Vue.use(Upload);
//   Vue.use(Progress);
//   Vue.use(Spinner);
//   Vue.use(Badge);
//   Vue.use(Card);
//   Vue.use(Rate);
//   Vue.use(Steps);
//   Vue.use(Step);
//   Vue.use(Carousel);
//   Vue.use(CarouselItem);
//   Vue.use(Collapse);
//   Vue.use(CollapseItem);
//   Vue.use(Cascader);
//   Vue.use(ColorPicker);
//   Vue.use(Transfer);
//   Vue.use(Container);
//   Vue.use(Header);
//   Vue.use(Aside);
//   Vue.use(Main);
//   Vue.use(Footer);
//   Vue.use(Timeline);
//   Vue.use(TimelineItem);
//   Vue.use(Link);
//   Vue.use(Divider);
//   Vue.use(Image);
//   Vue.use(Calendar);
//   Vue.use(Backtop);
//   Vue.use(PageHeader);
//   Vue.use(CascaderPanel);
  
//   Vue.use(Loading.directive);
  
//   Vue.prototype.$loading = Loading.service;
//   Vue.prototype.$msgbox = MessageBox;
//   Vue.prototype.$alert = MessageBox.alert;
//   Vue.prototype.$confirm = MessageBox.confirm;
//   Vue.prototype.$prompt = MessageBox.prompt;
//   Vue.prototype.$notify = Notification;
//   Vue.prototype.$message = Message;