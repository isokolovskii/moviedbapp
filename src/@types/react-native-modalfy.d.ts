import 'react-native-modalfy';
import type {ModalStackParams} from '../ui/Modals.tsx';

declare module 'react-native-modalfy' {
  interface ModalfyCustomParams extends ModalStackParams {}
}
