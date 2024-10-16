import {getToday, notEqual, strictEqual} from "../utils/helpers.ts";
import supabase from "./supabase";
import {IBooking, TFilterOptions, TSortOptions} from "./types.ts";
import {PAGE_SIZE} from "../utils/constants.ts";


export async function getBookings({ filter, sortBy, page }: { filter: TFilterOptions, sortBy?: TSortOptions, page?: number }) {
  let query =  supabase
      .from('bookings')
      //.select('*, cabins(*), guests(*)') select all fields for cabins & guests by wrapping (*)
      .select(
          'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)',
          { count: 'exact' }
      )
      //.eq('status', 'unconfirmed')

  // -- FILTER ---
  if (notEqual(filter, null)) { 
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    query[filter.method](filter.field, filter.value)
  }

  // -- SORT --
  if (sortBy?.field) {
    query = query.order(sortBy.field, { ascending: strictEqual(sortBy.direction, 'asc') })
  }


  // -- Pagination --
  if (page) {
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1
    query = query.range(from, to)
  }


  const { data, error, count } = await query

  if (error) {
    console.log(error)
    throw new Error('Bookings could not be loaded')
  }

   return { data, count };
}

export async function getBooking(id: number): Promise<IBooking> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

 export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday({}));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday({})}),and(status.eq.checked-in,endDate.eq.${getToday({})})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id: number, obj: unknown) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: number) {
  // RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
