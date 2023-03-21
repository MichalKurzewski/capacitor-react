import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
interface IPage {
  title: string;
  children: string | JSX.Element | JSX.Element[];
}
const Page: React.FC<IPage> = (props): JSX.Element => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>{props.title}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>{props.children}</IonContent>
  </>
);

export default Page;

