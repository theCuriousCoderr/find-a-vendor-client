export default function ListCount({ length }: { length: number }) {
  return (
    <>
      {length && (
        <div className="size-8 bg-white rounded-md shadow border flex items-center justify-center md:hidden">
          {length && <span>{length}</span>}
        </div>
      )}
    </>
  );
}
