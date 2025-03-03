import Layout from "../components/Layout";
import StickyHeadTable from "../components/ListTable";

export default function Owners() {
  return (
    <Layout><main id="main" className="main">
<section className="section">
  <div className="row">
    <div className="col-lg-12">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">All Owners</h5>
          <StickyHeadTable />
        </div>
      </div>
    </div>
  </div>
</section>
</main>
</Layout>
  );
}
