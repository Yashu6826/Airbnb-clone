export const dynamic = 'force-dynamic'
export const revalidate = false
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";
import getListings, { 
  IListingsParams
} from "@/app/actions/getListing";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
// import ClientOnly from "./components/ClientOnly";

interface HomeProps {
  searchParams: IListingsParams
};

const Home = async ({searchParams}: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if(listings.length === 0){
    return (
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  
  return (
    <ClientOnly>
      <Container>
    <div
    className="pt-24
    grid
    grid-col-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grdi-cols-5
    2xl:grid-cols-6
    gap-8">
        {listings.map((listing) =>{ 
          return (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          )
})}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;