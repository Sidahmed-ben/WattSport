<template >
  <!-- Bootstrap Icons Starts -->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
  />
  <!-- Bootstrap Icons Ends -->
  <div class="container-xl div-cont-xl">
    <div class="table-responsive">
      <div class="table-wrapper">
        <div class="table-title" >
          <div class="row" style="text-align: center;">
            <div class="col-sm-12">
              <h2>
                <b>{{ titreTableau }}</b>
              </h2>
              <button
                class="close"
                id="exit"
                @click="hideListEvent();"
              >&times;</button>
            </div>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <!-- <div> -->
          <thead>
            <tr>
              <th v-for="(column, index) in columns" :key="index">{{ column.column }}</th>
            </tr>
          </thead>
          <!-- </div> -->
          <tbody>
            <tr v-for="(item,index1) in items" :key="index1">
              <td v-for="(column,index2) in item.columns" :key="index2">{{ column }}</td>
              <td>
                <div>
                  <button type="button" class="btn btn-primary">s'inscrire</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!--  Fin du tableau  -->
      </div>
    </div>
  </div>
  


</template>

<script>


export default {
  name: "TableSeanceUserCmp.vue",
  components: {  },
  props: ["titreTableau"],
  data() {
    return {
      items: [],
      columns: [],
      // titreTableau: "",
      selectedRow: null,
      selectedRowContent: { titre: null, date: null, heure: null },
    };
  },
  mounted() {
    this.items = [
      { columns: ["Titre Seance 1", "2025-09-01", "22:01"] },
      { columns: ["Titre Seance 2", "2025-09-02", "22:01"] },
      { columns: ["Titre Seance 3", "2025-09-03", "22:01"] },
      { columns: ["Titre Seance 4", "2025-09-04", "22:01"] },
      { columns: ["Titre Seance 5", "2025-09-05", "22:01"] },
      { columns: ["Titre Seance 6", "2025-09-06", "22:01"] },
      { columns: ["Titre Seance 7", "2025-09-07", "22:01"] },
      { columns: ["Titre Seance 8", "2025-09-08", "22:01"] },
      { columns: ["Titre Seance 9", "2025-09-09", "22:01"] },
      { columns: ["Titre Seance 10", "2025-09-10", "22:01"] },
      { columns: ["Titre Seance 11", "2025-09-11", "22:01"] },
      { columns: ["Titre Seance 12", "2025-09-12", "22:01"] },
    ],
    this.columns = [{ column: "Titre", type: "text" }, { column: "Date : aaaa/mm/jj ", type: "TimePicker" }, { column: "Heure", type: null }, { column: "Actions", type: null }];
    console.log(" Mounted ");
  },

  methods: {
    hideListEvent() {
      console.log("HideList");
      this.$emit('hideListEvent')
    }
  }
};
</script>

<style scoped>
/* Tableau css */

div.div-cont-xl {
  position: absolute;
  /* margin: 0px auto; */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.table-responsive {
  margin: 30px 0;
}
.table-wrapper {
  background: #fff;
  padding: 20px 25px;
  border-radius: 3px;
  min-width: 200px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  overflow: auto;
  height: 700px;
  width: 1000px;
  margin: auto;
}
.table-title {
  padding-bottom: 15px;
  background: #2f323a;
  color: #fff;
  padding: 16px 30px;
  min-width: 100%;
  margin: -20px -25px 0px;
  border-radius: 3px 3px 0 0;
  position: sticky;
  top: -20px;
  z-index: 9;
}
.table-title h2 {
  margin: 5px 0 0;
  font-size: 24px;
}

.table-title .btn {
  color: #fff;
  float: right;
  font-size: 13px;
  border: none;
  min-width: 50px;
  border-radius: 2px;
  border: none;
  outline: none !important;
  margin-left: 10px;
}
.table-title .btn i {
  float: left;
  font-size: 21px;
  margin-right: 5px;
}
.table-title .btn span {
  float: left;
  margin-top: 2px;
}
table.table tr th,
table.table tr td {
  border-color: #e9e9e9;
  padding: 12px 15px;
  vertical-align: middle;
}
table.table tr th:first-child {
  width: auto;
}
table.table tr th:last-child {
  width: 180px;
  padding-left: 40px;
}

table.table-striped tbody button {
  margin-left: 10px;
}


table.table-striped tbody tr:nth-of-type(odd) {
  background-color: #fcfcfc;
}
table.table-striped.table-hover tbody tr:hover {
  background: #f5f5f5;
}
table.table th i {
  font-size: 13px;
  margin: 0 5px;
  cursor: pointer;
}
table.table td:last-child i {
  opacity: 0.9;
  font-size: 22px;
  margin: 0 5px;
}

table.table td a {
  font-weight: bold;
  color: #566787;
  display: inline-block;
  text-decoration: none;
  outline: none !important;
}
table.table td a:hover {
  color: #2196f3;
}
table.table td a.edit {
  cursor: pointer;
  color: #ffc107;
}
table.table td a.delete {
  cursor: pointer;
  color: #f44336;
}
table.table td a.list {
  cursor: pointer;
  color: #001e4f;
}
table.table td i {
  font-size: 19px;
}

.hint-text {
  float: left;
  margin-top: 10px;
  font-size: 13px;
}

/* ---------------------------------------------- */

.container-xl {
  padding-right: 0;
  padding-left: 0;
}

.table thead th {
  position: sticky;
  top: 47px;
  background-color: rgb(255, 255, 255);
  z-index: 9;
  margin-top: 0;
}
/* ---------------------------------------------- */


button#exit{
     line-height: 12px;
     width: 18px;
     font-size: 15pt;
     font-family: tahoma;
     margin-top: 1px;
     margin-right: 2px;
     position:absolute;
     top:0;
     right:0;
     color: white;
}
</style>
