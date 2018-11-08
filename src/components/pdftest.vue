<template>
  <div>
    <div class="row" ref="pdfDom" style="padding-top: 55px;background-color:#fff;">
      分支测试，给自己需要导出的ui部分.定义id为"pdfDom".此部分将就是pdf显示的部分<br>
      本地图片
      <img src="../assets/logo.jpeg"><br>
      base64图片
      <img v-bind:src="imgSrc" ref="img1">
    </div>
    <button type="button" class="btn btn-primary" v-on:click="getBase64Pdf()">导出PDF</button>
  </div>
</template>

<script>
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export default {
  name: 'pdftest',
  data () {
    return {
      htmlTitle: '页面导出PDF文件名',
      imgSrc: 'http://img1.qunarzz.com/sight/p0/1410/34/f540a04367d06820af4dfeaf0ad40257.water.jpg_280x200_18607be5.jpg'
    }
  },
  mounted () {
  },
  methods: {
    convertImgToBase64 (url, callback, outputFormat) {
      let canvas = document.createElement('CANVAS')
      let ctx = canvas.getContext('2d')
      let img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = function () {
        canvas.height = img.height
        canvas.width = img.width
        ctx.drawImage(img, 0, 0)
        let dataURL = canvas.toDataURL(outputFormat || 'image/jpeg')
        callback.call(this, dataURL)
        canvas = null
      }
      img.src = url
    },
    getPdf (pdfDom) {
      let title = this.htmlTitle
      html2Canvas(pdfDom, {
        allowTaint: true
      }).then(function (canvas) {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 595.28
        let imgHeight = 592.28 / contentWidth * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(title + '.pdf')
      })
    },
    getBase64Pdf () {
      let _this = this
      this.convertImgToBase64(this.imgSrc, function (base64ImgSrc) {
        _this.$refs.img1.src = base64ImgSrc
        let pdfDom = _this.$refs.pdfDom
        _this.getPdf(pdfDom)
      })
    }
  }
}
</script>

<style scoped>

</style>
