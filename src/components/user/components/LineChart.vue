<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['chartdata', 'options'],
  mounted () {
    setTimeout(() => {
      this.renderChart(this.chartdata, this.options)
    }, 2500)
  },
  
 
}
</script>

<style>
</style>