<template>
    <div class="tipPop">
        <slot>
        </slot>
    </div>
</template>

<script>

</script>

<style scoped lang="scss">
    .tipPop {
        position: relative;
        &::after {
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-top: 5px solid black;
            border-right: 5px solid transparent;
            border-left: 5px solid transparent;
        }
    }
</style>