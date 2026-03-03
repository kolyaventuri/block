import Text from './block/text';
import Confirmation from './block/confirmation';
import Button from './block/button';
import Image from './block/image';
import Container from './layout/container';
import Section from './layout/section';
import Actions from './layout/actions';
import Context from './layout/context';
import Divider from './layout/divider';
import File from './layout/file';
import Header from './layout/header';
import ImageLayout from './layout/image';
import Input from './layout/input';
import RichText from './layout/rich-text';
import Video from './layout/video';
import TextInput from './input/text';
import DateTimePicker from './input/date-time-picker';
import DatePicker from './input/date-picker';
import Checkboxes from './input/checkboxes';
import Select from './input/select';
import Option from './input/option';
import OptionGroup from './input/option-group';
import Overflow from './input/overflow';
import RadioGroup from './input/radio-group';
import TimePicker from './input/time-picker';
import RichTextSection from './rich-text/section';
import RichTextList from './rich-text/list';
import RichTextQuote from './rich-text/quote';
import RichTextPreformatted from './rich-text/preformatted';
import RichTextText from './rich-text/text';
import RichTextLink from './rich-text/link';
import RichTextUser from './rich-text/user';
import RichTextChannel from './rich-text/channel';
import RichTextEmoji from './rich-text/emoji';
import RichTextDate from './rich-text/date';
import RichTextBroadcast from './rich-text/broadcast';
import RichTextUserGroup from './rich-text/user-group';
import Transformers from './registry';

Object.assign(Transformers, {
  Container,
  Section,
  Actions,
  Context,
  Divider,
  File,
  Header,
  ImageLayout,
  Input,
  RichText,
  Video,
  Text,
  Confirmation,
  Button,
  Image,
  TextInput,
  DateTimePicker,
  DatePicker,
  Checkboxes,
  Select,
  Overflow,
  RadioGroup,
  TimePicker,
  Option,
  OptionGroup,
  RichTextSection,
  RichTextList,
  RichTextQuote,
  RichTextPreformatted,
  RichTextText,
  RichTextLink,
  RichTextUser,
  RichTextChannel,
  RichTextEmoji,
  RichTextDate,
  RichTextBroadcast,
  RichTextUserGroup,
});

export {default} from './registry';
