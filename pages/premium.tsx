import { getSession, useSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { Layout } from "@components/Layout"

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}

const PremiumPage = () => {
  const [session, loading] = useSession()

  if (loading) { return null }

  if (!session) {
    return (
      <Layout>
        <div className="wrapper">
          <h2>Acceso denegado</h2>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="wrapper">
        <h2>Exclusive content</h2>
      </div>
    </Layout>
  )
}

export default PremiumPage