import Head from 'next/head'

const ValuationsHead = ({ title }) => (
  <Head>
    <title>{title}</title>
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
  </Head>
);

export default ValuationsHead;
