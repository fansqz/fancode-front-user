<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">数据结构</span>
          <br />可视化学习平台
        </h1>
        <p class="hero-subtitle">通过直观的可视化展示，轻松掌握数据结构与算法</p>
        <div class="hero-buttons">
          <el-button type="primary" size="large" class="primary-button" @click="goToCoding">
            开始学习
            <el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
          <el-button size="large" class="secondary-button" @click="scrollToFeatures">
            了解更多
            <el-icon class="el-icon--right"><ArrowDown /></el-icon>
          </el-button>
        </div>
      </div>
      <div class="hero-image">
        <div class="floating-card card-1">
          <el-icon><DataLine /></el-icon>
          <span>可视化学习</span>
        </div>
        <div class="floating-card card-2">
          <el-icon><Monitor /></el-icon>
          <span>在线调试</span>
        </div>
        <div class="floating-card card-3">
          <el-icon><Reading /></el-icon>
          <span>知识库</span>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features" ref="featuresSection">
      <div class="section-header">
        <h2 class="section-title">核心功能</h2>
        <p class="section-subtitle">探索我们的特色功能，开启你的编程学习之旅</p>
      </div>
      <div class="features-container">
        <div class="feature-item" v-for="(feature, index) in features" :key="index">
          <div class="feature-icon-wrapper">
            <el-icon class="feature-icon" :size="32">
              <component :is="feature.icon" />
            </el-icon>
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Showcase Section -->
    <section class="showcase">
      <div class="section-header">
        <h2 class="section-title">功能展示</h2>
        <p class="section-subtitle">直观感受我们的平台特色</p>
      </div>
      <div class="showcase-container">
        <div class="showcase-item" v-for="(item, index) in showcaseItems" :key="index">
          <div class="showcase-image">
            <img :src="item.image" :alt="item.title" />
          </div>
          <div class="showcase-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="cta-content">
        <h2>准备好开始你的编程之旅了吗？</h2>
        <p>立即加入我们，开启数据结构与算法的学习之旅</p>
        <el-button type="primary" size="large" class="cta-button" @click="goToCoding">
          立即开始
          <el-icon class="el-icon--right"><ArrowRight /></el-icon>
        </el-button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  DataLine,
  Monitor,
  Reading,
  SetUp,
  ArrowRight,
  ArrowDown
} from '@element-plus/icons-vue';

const router = useRouter();
const featuresSection = ref<HTMLElement | null>(null);

const features = ref([
  {
    icon: DataLine,
    title: '数据结构可视化',
    description: '通过动态演示，直观理解各种数据结构的实现原理和操作过程'
  },
  {
    icon: Monitor,
    title: '在线调试',
    description: '提供实时编译和运行环境，支持断点调试，快速定位问题'
  },
  {
    icon: Reading,
    title: '知识库学习',
    description: '系统化的学习资料，从基础到进阶，循序渐进掌握编程知识'
  },
  {
    icon: SetUp,
    title: '自定义数据结构',
    description: '支持创建和测试自定义数据结构，培养编程思维和创新能力'
  }
]);

const showcaseItems = ref([
  {
    title: '可视化学习体验',
    description: '通过直观的图形界面，轻松理解复杂的数据结构概念',
    image: '/images/showcase-visualization.png'
  },
  {
    title: '实时代码调试',
    description: '在线编写和调试代码，即时查看运行结果和数据结构变化',
    image: '/images/showcase-debug.png'
  }
]);

const goToCoding = () => {
  router.push('/coding');
};

const scrollToFeatures = () => {
  featuresSection.value?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
  overflow-x: hidden;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
  gap: 40px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  .hero-content {
    flex: 1;
    max-width: 600px;
  }

  .hero-title {
    font-size: 4em;
    font-weight: 800;
    color: #2c3e50;
    margin-bottom: 20px;
    line-height: 1.2;

    .gradient-text {
      background: linear-gradient(45deg, #409EFF, #36D1DC);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .hero-subtitle {
    font-size: 1.5em;
    color: #5d6778;
    margin-bottom: 40px;
    line-height: 1.6;
  }

  .hero-buttons {
    display: flex;
    gap: 20px;
  }

  .primary-button {
    padding: 15px 40px;
    font-size: 1.2em;
    border-radius: 30px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(64, 158, 255, 0.3);
    }
  }

  .secondary-button {
    padding: 15px 40px;
    font-size: 1.2em;
    border-radius: 30px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      background: #f0f7ff;
    }
  }

  .hero-image {
    flex: 1;
    max-width: 600px;
    position: relative;
    overflow: visible;

    img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .floating-card {
      position: absolute;
      background: white;
      padding: 15px 25px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 10px;
      animation: float 3s ease-in-out infinite;
      z-index: 1;

      .el-icon {
        color: #409EFF;
        font-size: 20px;
      }

      span {
        color: #2c3e50;
        font-weight: 500;
      }
    }

    .card-1 {
      top: 20%;
      left: -10px;
      animation-delay: 0s;
    }

    .card-2 {
      top: 50%;
      right: -10px;
      animation-delay: 0.5s;
    }

    .card-3 {
      bottom: 20%;
      left: 50%;
      transform: translateX(-50%);
      animation-delay: 1s;
    }
  }
}

.section-header {
  text-align: center;
  margin-bottom: 60px;

  .section-title {
    font-size: 2.5em;
    color: #2c3e50;
    margin-bottom: 20px;
    font-weight: 700;
  }

  .section-subtitle {
    font-size: 1.2em;
    color: #5d6778;
    max-width: 600px;
    margin: 0 auto;
  }
}

.features {
  padding: 100px 0;
  background: #ffffff;
  width: 100%;
  box-sizing: border-box;

  .features-container {
    display: flex;
    justify-content: space-between;
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .feature-item {
    flex: 1;
    background: #ffffff;
    padding: 40px 30px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    text-align: center;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    }

    .feature-icon-wrapper {
      width: 80px;
      height: 80px;
      background: #f0f7ff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 25px;
    }

    .feature-icon {
      color: #409EFF;
    }

    h3 {
      font-size: 1.4em;
      color: #2c3e50;
      margin-bottom: 15px;
      font-weight: 600;
    }

    p {
      color: #5d6778;
      line-height: 1.6;
      font-size: 1.1em;
    }
  }
}

.showcase {
  padding: 100px 0;
  background: #f8f9fa;
  width: 100%;
  box-sizing: border-box;

  .showcase-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .showcase-item {
    display: flex;
    align-items: center;
    margin-bottom: 80px;
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    }

    &:nth-child(even) {
      flex-direction: row-reverse;
    }

    .showcase-image {
      flex: 1;
      height: 400px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }
    }

    .showcase-content {
      flex: 1;
      padding: 40px;
      text-align: left;

      h3 {
        font-size: 1.8em;
        color: #2c3e50;
        margin-bottom: 20px;
        font-weight: 600;
      }

      p {
        color: #5d6778;
        line-height: 1.6;
        font-size: 1.1em;
      }
    }
  }
}

.cta {
  padding: 100px 0;
  background: linear-gradient(45deg, #409EFF, #36D1DC);
  color: white;
  text-align: center;

  .cta-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;

    h2 {
      font-size: 2.5em;
      margin-bottom: 20px;
      font-weight: 700;
    }

    p {
      font-size: 1.2em;
      margin-bottom: 40px;
      opacity: 0.9;
    }

    .cta-button {
      padding: 15px 40px;
      font-size: 1.2em;
      border-radius: 30px;
      background: white;
      color: #409EFF;
      border: none;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
      }
    }
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 40px 20px;
    overflow: visible;

    .hero-title {
      font-size: 3em;
    }

    .hero-buttons {
      justify-content: center;
    }

    .hero-image {
      margin-top: 40px;
      overflow: visible;
    }
  }

  .showcase-item {
    flex-direction: column !important;
    
    .showcase-image {
      height: 300px;
    }

    .showcase-content {
      padding: 30px;
      text-align: center;
    }
  }

  .features-container {
    flex-direction: column;
  }

  .feature-item {
    margin-bottom: 30px;
  }
}
</style>
