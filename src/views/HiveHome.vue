<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <h1>Hive: Превратите хаос задач в идеальный порядок</h1>
        <p>Умный планировщик для вашей продуктивности</p>
        <button class="cta-button">Начать бесплатно</button>
      </div>
    </section>
    
    <!-- Добавьте другие секции лендинга -->
  </div>
</template>

<script>
export default {
  name: 'HiveHome'
}
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 100px 0;
  background: linear-gradient(135deg, rgba(26, 42, 108, 0.05), rgba(178, 31, 31, 0.05), rgba(253, 187, 45, 0.1));
  border-radius: 10px;
  margin: 40px 0;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #1a2a6c;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #555;
}

.cta-button {
  background-color: #fdbb2d;
  color: #1a2a6c;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 1.1rem;
}

.cta-button:hover {
  background-color: #ffcc44;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>