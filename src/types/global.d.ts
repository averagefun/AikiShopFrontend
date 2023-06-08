interface IBoxberryResult {
    id: string,
    address: string
}
type BoxberryCallbackFunction = (result: IBoxberryResult) => void;

interface Window {
    boxberry: {
        open: (callback: BoxberryCallbackFunction) => void;
    }
}