// import 'regenerator-runtime/runtime';
// import { createSpeechServicesPonyfill } from 'web-speech-cognitive-services';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


// export function SpeechMic(props: { inputRef: React.RefObject<HTMLInputElement> }) {
//     // speech input
//     // const {
//     //     transcript,
//     //     listening,
//     //     browserSupportsSpeechRecognition,
//     // } = useSpeechRecognition();
//
//     // useEffect(() => {
//     //     import('@/actions/getVoiceAuthToken').then(({ getVoiceAuthToken }) => {
//     //         getVoiceAuthToken().then((token) => {
//     //             const { SpeechRecognition: AzureSpeechRecognition } = createSpeechServicesPonyfill({
//     //                 credentials: {
//     //                     region: 'eastus',
//     //                     authorizationToken: token,
//     //                 },
//     //             });
//     //             SpeechRecognition.applyPolyfill(AzureSpeechRecognition);
//     //         });
//     //     });
//     // }, []);
//
//     // useEffect(() => {
//     //     if (transcript && props.inputRef.current) {
//     //         props.inputRef.current.value = transcript;
//     //     }
//     // }, [transcript]);
//     //
//     // if (!browserSupportsSpeechRecognition) {
//     //     return;
//     // }
//
//     // const startListening = () => SpeechRecognition.startListening({
//     //     continuous: false,
//     //     language: 'en-US',
//     // });
//
//     if (!SpeechRecognition) {
//         return;
//     }
//
//     return (
//         <button
//             onTouchStart={startListening}
//             onMouseDown={startListening}
//             onTouchEnd={SpeechRecognition.stopListening}
//             onMouseUp={SpeechRecognition.stopListening}
//             className="rounded-full p-2 bg-primary"
//         >
//             {listening && <Mic/>}
//             {!listening && <MicOff/>}
//         </button>
//     );
// }