<script setup lang="ts">
  const router = useRouter()
  const clickEvent = ()=> router.push('/markdown')
</script>

# this template shows how to use unplugs toolchain
## 1. use render or tsx in script setup
## 2. use auto import for component and hooks
## 3. use vite-style-import plugin auto import  Ui lib style 


<el-button type="primary" v-bind:onClick="clickEvent" >like this</el-button>

