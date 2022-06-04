<template>
    <div class="child">Child: {{ msg }}7</div>
</template>

<script>
export default {
    props: {
        msg: {
            type: String,
            default: ''
        }
    }
}
</script>