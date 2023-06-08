'use client'
import axios from 'axios'
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { SafeReservation,SafeUser } from "../types";
import Heading from '../components/Heading';
import Container from "../components/Container";
import toast from 'react-hot-toast'
import ListingCard from '../components/listings/ListingCard';

interface TripsclientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}
const TripsClient:React.FC<TripsclientProps> = ({
    reservations,
    currentUser
}) =>
{
 
    const router = useRouter();
    const [deletingId,setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(() =>{
            toast.success('Reservation Cancelled');
            router.refresh();
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error);
        })
        .finally(() =>{
            setDeletingId('');
        })
    },[router]);
    return (
        <Container>
            <Heading
            title="Trips"
            subtitle="Where you've been and where you're going"
            />
            <div className='
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            2xl:grdi-cols-6
            gap-8
            '>  
            {reservations.map((reservation: any) => (
                <ListingCard
                  key={reservation.id}
                  data={reservation.listing}
                  reservation={reservation}
                  actionId={reservation.id}
                  onAction={onCancel}
                  disabled={deletingId === reservation.id}
                  actionLabel="Cancel reservation"
                  currentUser={currentUser}
                />
              ))}
            </div>
        </Container>
    )
}
export default TripsClient;