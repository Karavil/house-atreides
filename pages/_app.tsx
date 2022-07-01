import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Schedule, ScheduleContext } from "../lib/context/schedule-context";
import { SCHEDULE } from "../lib/const";

function MyApp({ Component, pageProps }: AppProps & { schedule: Schedule }) {
  return <Component {...pageProps} />;
}

export default MyApp
