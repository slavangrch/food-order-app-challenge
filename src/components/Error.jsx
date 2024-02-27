export default function Error(props) {
  return (
    <div>
      <h1 className="error-heading">Failed to load content</h1>
      <p>{props.message}</p>
    </div>
  );
}
